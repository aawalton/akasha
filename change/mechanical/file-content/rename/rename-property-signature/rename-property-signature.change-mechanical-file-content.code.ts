import type { Said } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { signatureRespelled } from "akasha/change/modules/property-signature-renaming/property-signature-renaming.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type RenamePropertySignatureAsked = {
  readonly at: string
  readonly of: string
  readonly to: string
}

export function runChange(world: World, given: RenamePropertySignatureAsked): Said {
  return signatureRespelled(world, given)
}
