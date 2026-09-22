import { NarrowError } from "akasha/code/type/narrowing/modules/narrow-error/narrow-error.module.code.ts"
import { parseSaidText } from "akasha/code/type/narrowing/modules/parse-said-text/parse-said-text.module.code.ts"

declare const process: { readonly env: Record<string, string | undefined> }

export function requireEnv(name: string): string {
  const held = parseSaidText(process.env[name])
  if (held === undefined) throw new NarrowError(`requireEnv: env var ${name} is not set`)
  return held
}

export function optionalEnv(name: string): string | undefined {
  return parseSaidText(process.env[name])
}
