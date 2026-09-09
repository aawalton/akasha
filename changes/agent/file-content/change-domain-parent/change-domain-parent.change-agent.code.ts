import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const CHANGE_DOMAIN_PARENT = "change-mechanical-file-content/change-domain-parent"

const PAGE = "page"

const TO = "to"

export type ChangeDomainParentAsked = {
  readonly page: string
  readonly to: string
}

export async function changeDomainParent(
  world: World,
  given: ChangeDomainParentAsked
): Promise<Answer> {
  return (await reach(world, CHANGE_DOMAIN_PARENT, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const page = given[PAGE]
  if (page === undefined) return refusing(missing(PAGE))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await changeDomainParent(world, { page, to })
}
