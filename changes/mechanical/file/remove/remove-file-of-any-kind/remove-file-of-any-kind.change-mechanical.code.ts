import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { kindOf } from "../../../../modules/target-kinding/target-kinding.module.code.ts"

const ADDRESSES = {
  file: "change-mechanical-file/remove-file",
  "file-code": "change-mechanical/remove-file-code",
  "file-page": "change-mechanical-file/remove-file-page",
  "file-page-property": "change-mechanical/remove-file-page-property",
  "file-page-type": "change-mechanical/remove-file-page-type",
} as const

export type Asked = {
  readonly at: string
}

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, addressFor(world, given.at), { at: given.at })).said
}
