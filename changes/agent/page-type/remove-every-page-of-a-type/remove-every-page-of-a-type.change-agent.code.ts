import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

const PAGE_TYPE = "page-type"

export type RemoveEveryPageOfATypeAsked = {
  readonly pageType: string
}

export async function removeEveryPageOfAType(
  world: World,
  given: RemoveEveryPageOfATypeAsked
): Promise<Answer> {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return refusing(`\`${given.pageType}\` names no page type`)
  }
  const listed = world.index.everyOfType(given.pageType)
  if (listed.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const answers: Answer[] = []
  let over: World = isLedger(world) ? world : ledgerAt(world.root, world.textOf, world.reaching)
  for (const one of listed) {
    const reached = await reach(over, REMOVE_FILE_PAGE, { at: one.path })
    if (reached.said.refused !== null) {
      return refusing(`\`${one.path}\` is refused, and ${reached.said.refused}`)
    }
    over = reached.world
    answers.push(reached.said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  return await removeEveryPageOfAType(world, { pageType })
}
