import { readFileSync } from "node:fs"
import { notUtf8 } from "akasha/checks/modules/body-not-utf8/body-not-utf8.module.code.ts"
import { decodeUtf8 } from "akasha/code/utf8-body/utf8-body.module.code.ts"
import { fail } from "akasha/commands/modules/failing/command-failing.module.code.ts"

export function rejectUnknownFlags(
  argv: readonly string[],
  takesValue: readonly string[],
  standalone: readonly string[]
): undefined {
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined || !token.startsWith("--")) continue
    if (takesValue.includes(token)) {
      at += 1
      continue
    }
    if (standalone.includes(token)) continue
    fail(`${token} is not a flag this command takes`)
  }
}

export async function readPayloadIfAny(source: string): Promise<unknown | null> {
  const bytes = source === "-" ? await Bun.stdin.bytes() : readFileSync(source)
  if (bytes.length === 0) return null
  const text = decodeUtf8(bytes)
  if (text === null) fail(notUtf8(source === "-" ? "stdin" : source, bytes))
  if (text.trim() === "") return null
  try {
    return JSON.parse(text)
  } catch (err) {
    fail(`input is not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export async function readPayload(source: string): Promise<unknown> {
  const bytes = source === "-" ? await Bun.stdin.bytes() : readFileSync(source)
  const text = decodeUtf8(bytes)
  if (text === null) fail(notUtf8(source === "-" ? "stdin" : source, bytes))
  try {
    return JSON.parse(text)
  } catch (err) {
    fail(`input is not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
}

export function record(value: unknown, where: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${where} is not an object`)
  }
  return value as Record<string, unknown>
}

export function requiredString(
  source: Record<string, unknown>,
  key: string,
  where: string
): string {
  const value = source[key]
  if (typeof value !== "string") fail(`${where} needs a \`${key}\` string`)
  return value
}

export interface Declared {
  readonly source: Record<string, unknown>
  readonly filePath: string
  readonly where: string
}

export function declaredEntries(
  payload: unknown,
  verb: string,
  alsoTakingAway = false
): readonly Declared[] {
  const many = Array.isArray(payload)
  const list = many ? payload : [payload]
  if (list.length === 0 && !alsoTakingAway) {
    fail(`the payload declares no file, so it asks for no ${verb} at all`)
  }
  return list.map((one, i) => {
    const where = many ? `entry ${i + 1}` : "the payload"
    const source = record(one, where)
    return { source, filePath: requiredString(source, "file_path", where), where }
  })
}
