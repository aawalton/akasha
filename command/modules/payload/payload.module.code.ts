import { readFileSync } from "node:fs"
import { notUtf8 } from "akasha/check/modules/body-not-utf8/body-not-utf8.module.code.ts"
import { decodeUtf8 } from "akasha/code/bodies/modules/utf8-body/utf8-body.module.code.ts"
import { fail } from "akasha/command/modules/failing/command-failing.module.code.ts"

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
