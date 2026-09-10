import { typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const MOVE_CODE_EXPORT = "change-mechanical/move-code-export"

const PAGE_PROPERTY = "page-property"

const TYPES = "types"

const HOLDS = "ts"

const SLUG = "slug"

const PAGE_TYPE = "page-type"

export type AddPagePropertyTypesAsked = {
  readonly pageType: string
}

export async function addPagePropertyTypes(
  world: World,
  given: AddPagePropertyTypesAsked
): Promise<Answer> {
  if (!world.index.kindsUnder(PAGE_PROPERTY).has(given.pageType)) {
    return refusing(`\`${given.pageType}\` names no page type a page property is`)
  }
  const listed = world.index.everyOfType(given.pageType)
  if (listed.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  for (const one of listed) {
    const owner = pageIn(world, one.path)
    const slug = owner === null ? null : textAt(owner, SLUG)
    const to = besideAt(one.path, TYPES, HOLDS)
    if (slug === null || to === null)
      return refusing(`\`${one.path}\` states no slug to name a type`)
    const stated = await reach(over, ADD_PAGE_PROPERTY, {
      at: one.path,
      key: TYPES,
      value: JSON.stringify(HOLDS),
    })
    if (stated.said.refused !== null) {
      return refusing(`\`${one.path}\` is refused, and ${stated.said.refused}`)
    }
    over = stated.world
    answers.push(stated.said)
    const moved = await reach(over, MOVE_CODE_EXPORT, {
      from: one.path,
      to,
      of: typedAs(slug),
    })
    if (moved.said.refused !== null) {
      return refusing(`\`${one.path}\` is refused, and ${moved.said.refused}`)
    }
    over = moved.world
    answers.push(moved.said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  return await addPagePropertyTypes(world, { pageType })
}
