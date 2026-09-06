import type { Answer, Given } from "@akasha/command-system/calling"
import { secretsIn } from "@akasha/pages/page-secret"
import {
  aiming,
  caught,
  FILE_PATH,
  KEEP_LAST_NEWLINE,
  KEY,
  landedWith,
  MESSAGE,
  mistaken,
  pipedIn,
  valueOf,
} from "../page-secret-acting/page-secret-acting.module.code.ts"

const ACT = "set"

const BARE = "a secret's value is piped in, and nothing is piped in"

export async function pageSecretSet(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
    const aimed = aiming(argv, given, [FILE_PATH, KEY, MESSAGE], [KEEP_LAST_NEWLINE])
    if ("code" in aimed) return aimed
    const key = aimed.key as string
    const taken = pipedIn()
    if ("tty" in taken) return mistaken([BARE])
    if ("unreadable" in taken) {
      return {
        report: [],
        refusals: [`what is piped in would not open — ${taken.unreadable}`],
        code: 3,
      }
    }
    const value = valueOf(taken.bytes, aimed.said.keepLastNewline)
    if (typeof value !== "string") return mistaken([value.refused])
    const next = new Map(secretsIn(given.root, aimed.target.path) ?? [])
    next.set(key, value)
    return landedWith(given, aimed.said, aimed.target, ACT, next)
  })
}
