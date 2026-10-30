import type { Rule } from "akasha/alan/harness/monarch/modules/rules/monarch-rules.module.code.ts"

export function signFrom(value: unknown, path: string): Rule["amountSign"] {
  if (value === undefined || value === null || value === "") return null
  if (typeof value !== "string") throw new Error(`${path}: an amount sign is a word`)
  if (value === "positive" || value === "negative") return value
  throw new Error(`${path}: an amount sign is "positive", "negative" or nothing — not "${value}"`)
}

export function readFlags(argv: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const flags = new Map<string, string[]>()
  let key: string | null = null
  for (const token of argv) {
    if (token.startsWith("--")) {
      key = token.slice(2)
      if (!flags.has(key)) flags.set(key, [])
    } else if (key === null) {
      throw new Error(`"${token}" comes before any --flag it could belong to`)
    } else {
      flags.get(key)?.push(token)
    }
  }
  return flags
}
