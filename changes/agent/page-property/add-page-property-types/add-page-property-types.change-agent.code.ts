import {
  gathered,
  missing,
  refusing,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { pageIn } from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import {
  isLedger,
  ledgerAt,
  reach,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { typedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const MOVE_CODE_EXPORT = "change-mechanical/move-code-export"

const PAGE_PROPERTY = "page-property"

const TYPES = "types"

const HOLDS = "ts"

const SLUG = "slug"

const PAGE_TYPE = "page-type"

const UNDER = "under"

export type AddPagePropertyTypesAsked = {
  readonly pageType: string
  readonly under?: string
}

export async function addPagePropertyTypes(
  world: World,
  given: AddPagePropertyTypesAsked
): Promise<Answer> {
  if (!world.index.kindsUnder(PAGE_PROPERTY).has(given.pageType)) {
    return refusing(`\`${given.pageType}\` names no page type a page property is`)
  }
  const under = given.under
  const listed = world.index
    .everyOfType(given.pageType)
    .filter((one) => under === undefined || one.path.startsWith(under))
  if (listed.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  let left = 0
  for (const one of listed) {
    const owner = pageIn(world, one.path)
    if (owner !== null && owner[TYPES] !== undefined) continue
    left += 1
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
  if (left === 0) return refusing(`every \`${given.pageType}\` states its type already`)
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const under = given[UNDER]
  return await addPagePropertyTypes(world, under === undefined ? { pageType } : { pageType, under })
}
