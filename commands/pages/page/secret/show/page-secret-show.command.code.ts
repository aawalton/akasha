import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { quoted as listed } from "akasha/commands/modules/seat-act-calling/seat-act-calling.module.code.ts"
import {
  aiming,
  caught,
  FILE_PATH,
} from "akasha/pages/commands/page-secret-acting/page-secret-acting.module.code.ts"
import { keysBeside } from "akasha/pages/secret/page-secret.module.code.ts"

const NOTHING = "nothing"

export async function pageSecretShow(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
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
