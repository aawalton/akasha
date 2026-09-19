import { addFilePropertyExtensions as addFilePropertyExtensionsMechanical } from "akasha/change/mechanical/page-type/add/add-file-property-extensions/add-file-property-extensions.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_EXTENSIONS =
  `${changeMechanicalPageType.slug}/${addFilePropertyExtensionsMechanical.slug}` as const

const UNDER = "under"

export type AddFilePropertyExtensionsAsked = {
  readonly under?: string
}

export async function addFilePropertyExtensions(
  world: World,
  given: AddFilePropertyExtensionsAsked
): Promise<Answer> {
  return (await reach(world, ADD_EXTENSIONS, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [UNDER]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const under = given[UNDER]
  return await addFilePropertyExtensions(world, under === undefined ? {} : { under })
}
