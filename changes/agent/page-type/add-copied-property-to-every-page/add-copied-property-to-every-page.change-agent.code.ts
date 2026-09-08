import { slugOf, textAt, textsAt, valuesOver } from "@akasha/pages/page-value"
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

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const CHANGE_FILE_CONTENT = "change-mechanical-file-content/change-file-content"

const PAGE_TYPE = "page-type"

const FROM = "from"

const KEY = "key"

const AFTER = "after"

export type AddCopiedPropertyToEveryPageAsked = {
  readonly pageType: string
  readonly from: string
  readonly key: string
  readonly after?: string
}

function onlyIn(said: readonly string[] | null): string | null {
  return said !== null && said.length === 1 ? (said[0] ?? null) : null
}

function handed(
  given: AddCopiedPropertyToEveryPageAsked,
  at: string,
  value: string
): Record<string, string> {
  const said = { at, key: given.key, value }
  return given.after === undefined ? said : { ...said, after: given.after }
}

function stated(from: string, value: string): string {
  return `${from}: [${JSON.stringify(value)}]`
}

export async function addCopiedPropertyToEveryPage(
  world: World,
  given: AddCopiedPropertyToEveryPageAsked
): Promise<Answer> {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return refusing(`\`${given.pageType}\` names no page type`)
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) {
    return refusing(`a \`${given.pageType}\` carries no property under \`${given.key}\``)
  }
  if (held.many) {
    return refusing(`\`${given.key}\` carries many values, so one value states nothing`)
  }
  const listed = world.index.everyOfType(given.pageType)
  if (listed.length === 0) return refusing(`no page is a \`${given.pageType}\``)
  const carriedAt = valuesOver(world.textOf)
  const above = new Map<string, string>()
  for (const one of listed) {
    const value = carriedAt(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const said = onlyIn(textsAt(value, given.from))
    if (slug !== null && said !== null) above.set(slug, slugOf(said))
  }
  const answers: Answer[] = []
  let over: World = isLedger(world) ? world : ledgerAt(world.root, world.textOf, world.reaching)
  for (const one of listed) {
    const value = carriedAt(one.path)
    const said = value === null ? null : onlyIn(textsAt(value, given.from))
    if (said === null) {
      return refusing(`\`${one.path}\` carries other than one value under \`${given.from}\``)
    }
    const bare = slugOf(said)
    const scope = above.get(bare)
    const named = scope === undefined ? bare : `${given.pageType}/${scope}/${bare}`
    const reached = await reach(over, ADD_PAGE_PROPERTY, handed(given, one.path, named))
    if (reached.said.refused !== null) {
      return refusing(`\`${one.path}\` is refused, and ${reached.said.refused}`)
    }
    over = reached.world
    answers.push(reached.said)
    if (said === named) continue
    const again = await reach(over, CHANGE_FILE_CONTENT, {
      at: one.path,
      old: stated(given.from, said),
      new: stated(given.from, named),
    })
    if (again.said.refused !== null) {
      return refusing(`\`${one.path}\` is refused, and ${again.said.refused}`)
    }
    over = again.world
    answers.push(again.said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const after = given[AFTER]
  return await addCopiedPropertyToEveryPage(
    world,
    after === undefined ? { pageType, from, key } : { pageType, from, key, after }
  )
}
