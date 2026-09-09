import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { kindOf } from "../../../../modules/target-kinding/target-kinding.module.code.ts"

const PAGE = "change-mechanical-file-content/change-file-content-page"

const ADDRESSES = {
  file: "change-mechanical-file-content/change-file-content",
  "file-code": "change-mechanical-file-content/change-file-content-code",
  "file-page": PAGE,
  "file-page-property": PAGE,
  "file-page-type": PAGE,
} as const

export type Asked = {
  readonly at: string
  readonly old: string
  readonly new: string
}

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (
    await reach(world, addressFor(world, given.at), {
      at: given.at,
      old: given.old,
      new: given.new,
    })
  ).said
}
