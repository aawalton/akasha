import { secretsIn } from "@akasha/pages/page-secret"
import {
  aiming,
  caught,
  FILE_PATH,
  KEY,
  wrongData,
} from "../../../../../pages/commands/page-secret-acting/page-secret-acting.module.code.ts"
import type { Answer, Given } from "../../../../modules/calling/calling.module.code.ts"

export async function pageSecretReveal(argv: readonly string[], given: Given): Promise<Answer> {
  return await caught(() => {
    const aimed = aiming(argv, given, [FILE_PATH, KEY])
    if ("code" in aimed) return aimed
    const key = aimed.key as string
    const held = secretsIn(given.root, aimed.target.path)
    const value = held === null ? undefined : held.get(key)
    if (value === undefined) {
      return wrongData(`${aimed.target.sidecar} holds no \`${key}\``)
    }
    return { report: [value], refusals: [], code: 0 }
  })
}
