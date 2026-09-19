import { changeDomainParent as changeDomainParentMechanical } from "akasha/change/mechanical/file-content/change/change-domain-parent/change-domain-parent.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHANGE_DOMAIN_PARENT =
  `${changeMechanicalFileContent.slug}/${changeDomainParentMechanical.slug}` as const

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

export const takes: readonly string[] = [PAGE, TO]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const page = given[PAGE]
  if (page === undefined) return refusing(missing(PAGE))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await changeDomainParent(world, { page, to })
}
