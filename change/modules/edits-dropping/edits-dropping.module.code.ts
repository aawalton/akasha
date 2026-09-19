import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { appendOnlyIn } from "akasha/page/index/modules/file-appending/file-appending.module.code.ts"
import type { Facing } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

export function dropped(facing: Facing, said: Answer): Answer {
  const held = said.edits.filter((one) => one.kind !== "replace" || !appendOnlyIn(facing, one.path))
  return held.length === said.edits.length ? said : { edits: held, refused: null }
}
