import { refusing, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly from: string
  readonly to: string
}

export function runChange(_world: World, given: Asked): Said {
  if (given.from === given.to) return refusing(`\`${given.to}\` is the path it already sits at`)
  return stating([{ kind: "move", pathFrom: given.from, pathTo: given.to }])
}
