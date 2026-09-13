import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { signatureRespelled } from "akasha/changes/modules/property-signature-renaming/property-signature-renaming.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type RenamePropertySignatureAsked = {
  readonly at: string
  readonly of: string
  readonly to: string
}

export function runChange(world: World, given: RenamePropertySignatureAsked): Said {
  return signatureRespelled(world, given)
}
