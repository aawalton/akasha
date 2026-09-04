import type { Answer, Given } from "@akasha/command-system/calling"
import { secretsIn } from "@akasha/pages-system/page-secret"
import {
  aiming,
  caught,
  FILE_PATH,
  KEY,
  landedWith,
  MESSAGE,
  wrongData,
} from "../page-secret-acting/page-secret-acting.module.code.ts"

const ACT = "clear"

export function pageSecretClear(argv: readonly string[], given: Given): Answer {
  return caught(() => {
    const aimed = aiming(argv, given, [FILE_PATH, KEY, MESSAGE])
    if ("code" in aimed) return aimed
    const key = aimed.key as string
    const held = secretsIn(given.root, aimed.target.path)
    if (held === null || !held.has(key)) {
      return wrongData(`${aimed.target.sidecar} holds no \`${key}\`, so there is none to clear`)
    }
    const next = new Map(held)
    next.delete(key)
    return landedWith(given, aimed.said, aimed.target, ACT, next)
  })
}
