import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { kindOf } from "../../../../modules/target-kinding/target-kinding.module.code.ts"

const ADDRESSES = {
  file: "change-mechanical-file/move-file",
  "file-code": "change-mechanical/move-file-code",
  "file-page": "change-mechanical-file/move-file-page",
  "file-page-property": "change-mechanical/move-file-page-property",
  "file-page-type": "change-mechanical/move-file-page-type",
} as const

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
}

export type Asked = {
  readonly from: string
  readonly to: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const address = addressFor(world, given.from)
  return (await reach(world, address, { from: given.from, to: given.to })).said
}
