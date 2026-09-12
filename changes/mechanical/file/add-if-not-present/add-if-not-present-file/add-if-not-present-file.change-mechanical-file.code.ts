import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
  readonly body: string
  readonly old?: string
}

const MOVED =
  "moved since the body handed in was composed — read it again and compose the body from" +
  " what is there now"

export function runChange(world: World, given: Asked): Said {
  const was = world.textOf(given.at)
  if (was === given.body) return stating([])
  if (given.old !== undefined && was !== given.old) {
    return refusing(`\`${given.at}\` ${MOVED}`)
  }
  if (was === null || was === "") {
    return stating([{ kind: "add", path: given.at, content: given.body }])
  }
  return stating([{ kind: "replace", path: given.at, contentFrom: was, contentTo: given.body }])
}
