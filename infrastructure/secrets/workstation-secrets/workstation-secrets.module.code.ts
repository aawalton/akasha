import { chmodSync, existsSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"

export const SECRETS_FILE = ".secrets.env"

const OWNER_ONLY = 0o600

function holdingOf(name: string): RegExp {
  return new RegExp(`^[ \\t]*(?:export[ \\t]+)?${name}=`)
}

export function bodyWith(body: string, name: string, value: string): string {
  const written = `export ${name}='${value}'`
  const holds = holdingOf(name)
  let replaced = false
  const kept = body.split("\n").map((line) => {
    if (!holds.test(line)) return line
    replaced = true
    return written
  })
  if (replaced) return kept.join("\n")
  const trailing = body === "" || body.endsWith("\n") ? "" : "\n"
  return `${body}${trailing}${written}\n`
}

export function saveWorkstationSecret(name: string, value: string, home?: string): string {
  if (value.includes("'"))
    throw new OperationalError(
      `the value for ${name} carries a single quote, which this file's form cannot hold`
    )
  if (value.includes("\n"))
    throw new OperationalError(`the value for ${name} carries a newline, and a line holds one line`)
  const at = join(home ?? homedir(), SECRETS_FILE)
  const body = existsSync(at) ? readFileSync(at, "utf8") : ""
  writeFileSync(at, bodyWith(body, name, value), { encoding: "utf8", mode: OWNER_ONLY })
  chmodSync(at, OWNER_ONLY)
  return at
}
