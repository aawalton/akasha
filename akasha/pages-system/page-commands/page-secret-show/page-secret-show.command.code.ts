import type { Answer, Given } from "@akasha/command-system/calling"
import { keysBeside } from "@akasha/pages-system/page-secret"
import {
  aiming,
  caught,
  FILE_PATH,
  listed,
} from "../page-secret-acting/page-secret-acting.module.code.ts"

const NOTHING = "nothing"

export function pageSecretShow(argv: readonly string[], given: Given): Answer {
  return caught(() => {
    const aimed = aiming(argv, given, [FILE_PATH])
    if ("code" in aimed) return aimed
    const target = aimed.target
    const keys = keysBeside(given.root, target.path)
    return {
      report: [
        `held:   ${target.sidecar} holds ${keys.length === 0 ? NOTHING : listed([...keys])}`,
        `secret: the page type declares ${
          target.declared.length === 0 ? "no key" : listed(target.declared)
        }`,
      ],
      refusals: [],
      code: 0,
    }
  })
}
