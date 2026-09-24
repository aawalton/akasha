import { readFileSync } from "node:fs"
import { notUtf8 } from "akasha/check/modules/body-not-utf8/body-not-utf8.module.code.ts"
import { decodeUtf8 } from "akasha/code/body/modules/utf8-body/utf8-body.module.code.ts"
import { fail } from "akasha/command/modules/failing/command-failing.module.code.ts"
import { z } from "zod"

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

const PAYLOAD_SAID = z.record(z.string(), z.unknown())

export async function readPayload(source: string): Promise<Record<string, unknown>> {
  const bytes = source === "-" ? await Bun.stdin.bytes() : readFileSync(source)
  const text = decodeUtf8(bytes)
  if (text === null) fail(notUtf8(source === "-" ? "stdin" : source, bytes))
  let held: ReturnType<typeof PAYLOAD_SAID.safeParse>
  try {
    held = PAYLOAD_SAID.safeParse(JSON.parse(text))
  } catch (err) {
    fail(`input is not JSON: ${err instanceof Error ? err.message : String(err)}`)
  }
  if (!held.success) fail("input is not a JSON object")
  return held.data
}

export function record(value: unknown, where: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${where} is not an object`)
  }
  return value as Record<string, unknown>
}
