import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  type Reaches,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const REMOVE_PAGE_PROPERTY = "change-mechanical-file-content/remove-page-property"

const PAGE_TYPE = "page-type"

const FROM = "from"

const TO = "to"

const MOST = "most"

export type MovePropertyOnEveryPageAsked = {
  readonly pageType: string
  readonly from: string
  readonly to: string
  readonly most?: number | null
}

type Moved = { readonly path: string; readonly value: string }

export function spelledAs(held: unknown, many: boolean): string | null {
  if (many || !Array.isArray(held)) return JSON.stringify(held) ?? null
  if (held.length !== 1) return null
  return JSON.stringify(held[0]) ?? null
}

function movedIn(
  world: World,
  given: MovePropertyOnEveryPageAsked,
  many: boolean
): readonly Moved[] | string {
  const moved: Moved[] = []
  const most = given.most ?? null
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (most !== null && moved.length >= most) return moved
      if (value[given.to] !== undefined) continue
      const held = value[given.from]
      if (held === undefined) continue
      const said = spelledAs(held, many)
      if (said === null) {
        return `\`${path}\` has more than one value under \`${given.from}\`, and \`${given.to}\` holds one`
      }
      moved.push({ path, value: said })
    }
  }
  return moved
}

export async function movePropertyOnEveryPage(
  world: World,
  given: MovePropertyOnEveryPageAsked
): Promise<Answer> {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return refusing(`\`${given.pageType}\` names no page type`)
  const into = carried.find((one) => one.key === given.to)
  if (into === undefined) {
    return refusing(`a \`${given.pageType}\` has no property under \`${given.to}\``)
  }
  if (!carried.some((one) => one.key === given.from)) {
    return refusing(`a \`${given.pageType}\` has no property under \`${given.from}\``)
  }
  const held = movedIn(world, given, into.many)
  if (typeof held === "string") return refusing(held)
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  const reaching = async (address: Reaches, asked: unknown): Promise<string | null> => {
    const said = await reach(over, address, asked)
    if (said.said.refused !== null) return said.said.refused
    over = said.world
    answers.push(said.said)
    return null
  }
  for (const one of held) {
    const put = await reaching(ADD_PAGE_PROPERTY, {
      at: one.path,
      key: given.to,
      value: one.value,
      after: given.from,
    })
    if (put !== null) return refusing(`\`${one.path}\` is refused, and ${put}`)
    const off = await reaching(REMOVE_PAGE_PROPERTY, { at: one.path, key: given.from })
    if (off !== null) return refusing(`\`${one.path}\` is refused, and ${off}`)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export function mostIn(said: string | undefined): number | null | string {
  if (said === undefined) return null
  const held = Number(said)
  if (!Number.isInteger(held) || held < 1) {
    return `\`${said}\` is no count of pages, a count being a whole number above nothing`
  }
  return held
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const most = mostIn(given[MOST])
  if (typeof most === "string") return refusing(most)
  return await movePropertyOnEveryPage(world, { pageType, from, to, most })
}
