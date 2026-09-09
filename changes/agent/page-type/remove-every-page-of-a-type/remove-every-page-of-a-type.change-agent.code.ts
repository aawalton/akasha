import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

const PAGE_TYPE = "page-type"

const COUNT = "count"

const WHOLE = /^\d+$/

export type RemoveEveryPageOfATypeAsked = {
  readonly pageType: string
  readonly count?: number
}

function noCount(said: string): string {
  return `\`${COUNT}\` counts pages to take away, and \`${said}\` is no whole number above nothing`
}

export async function removeEveryPageOfAType(
  world: World,
  given: RemoveEveryPageOfATypeAsked
): Promise<Answer> {
  const count = given.count
  if (count !== undefined && (!Number.isInteger(count) || count < 1)) {
    return refusing(noCount(String(count)))
  }
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return refusing(`\`${given.pageType}\` names no page type`)
  }
  const named = world.index.everyOfType(given.pageType)
  if (named.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const listed = count === undefined ? named : named.slice(0, count)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
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
  const counted = given[COUNT]
  if (counted === undefined) return await removeEveryPageOfAType(world, { pageType })
  if (!WHOLE.test(counted)) return refusing(noCount(counted))
  return await removeEveryPageOfAType(world, { pageType, count: Number(counted) })
}
