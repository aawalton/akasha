import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  entriedIn,
  identifiedOver,
} from "akasha/commands/modules/value-minting/value-minting.module.code.ts"

export type Asked = {
  readonly at: string
  readonly body: string
}

function bodiedFor(world: World, given: Asked): string {
  if (!entriedIn(world.index)(given.at)) return given.body
  return identifiedOver(given.body) ?? given.body
}

export function runChange(world: World, given: Asked): Said {
  const was = world.textOf(given.at)
  if (was === given.body) {
    return refusing(`\`${given.at}\` already holds this body, so this change writes nothing`)
  }
  const body = bodiedFor(world, given)
  if (was === null || was === "") {
    return stating([{ kind: "add", path: given.at, content: body }])
  }
  return stating([{ kind: "replace", path: given.at, contentFrom: was, contentTo: body }])
}
