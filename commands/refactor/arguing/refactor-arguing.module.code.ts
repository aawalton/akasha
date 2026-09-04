import { BREAK_GLASS, DRY_RUN } from "../../../command-system/asking/asking.module.code.ts"
import { MESSAGE, MESSAGE_FILE } from "../../write/write.command.code.ts"
import { LINE } from "../token-renaming/token-renaming.module.code.ts"

export const FROM = "--from"

export const TO = "--to"

export const PLURAL = "--plural"

export const AT = "--at"

export const IN_STRINGS = "--in-strings"

export const VALUED = [FROM, TO, PLURAL, AT, LINE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const NAMED = [FROM, TO, PLURAL, AT, LINE]

export type Read =
  | {
      readonly said: ReadonlyMap<string, string>
      readonly dryRun: boolean
      readonly inStrings: boolean
    }
  | { readonly refused: string }

export function flagsIn(argv: readonly string[]): Read {
  const said = new Map<string, string>()
  const bare = new Set<string>()
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (token === DRY_RUN || token === IN_STRINGS) {
      bare.add(token)
      at = at + 1
      continue
    }
    if (!VALUED.includes(token)) {
      return { refused: `\`${token}\` is not a flag this takes — it takes ${NAMED.join(", ")}` }
    }
    const value = argv[at + 1]
    if (value === undefined) return { refused: `${token} needs a value, and the line ends` }
    if (said.has(token)) return { refused: `${token} is said more than once` }
    said.set(token, value)
    at = at + 2
  }
  return { said, dryRun: bare.has(DRY_RUN), inStrings: bare.has(IN_STRINGS) }
}
