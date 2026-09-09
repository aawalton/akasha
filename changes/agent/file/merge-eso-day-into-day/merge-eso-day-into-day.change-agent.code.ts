import { parsedAs } from "@akasha/code/code-source"
import { besideAt } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import { gathered, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  type Reaches,
  reach,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { statedIn } from "../../../modules/page-literal/page-literal.module.code.ts"

const MOVE_FILE = "change-mechanical-file/move-file"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const ESO_DAY = "eso-day"

const SLUG = "slug"

const OPENING = "eso-day-"

const DAYS = "alan/track/days/pages"

const CARRIED = ["healthSamples", "listens"] as const

const MOST = "most"

type Beside = {
  readonly key: string
  readonly value: string
  readonly from: string
  readonly to: string
}

type Folded = {
  readonly to: string
  readonly beside: readonly Beside[]
}

type Read = Folded | { readonly refused: string } | null

function dayAt(date: string): string {
  return `${DAYS}/${date}/day-${date}.day.ts`
}

function textsIn(at: string, text: string): ReadonlyMap<string, string> {
  return new Map([...statedIn(parsedAs(at, text))].map(([key, one]) => [key, one.text]))
}

function besideIn(
  at: string,
  to: string,
  said: ReadonlyMap<string, string>
): readonly Beside[] | string {
  const found: Beside[] = []
  for (const key of CARRIED) {
    const value = said.get(key)
    if (value === undefined) continue
    const from = besideAt(at, slugFor(key), value)
    const lands = besideAt(to, slugFor(key), value)
    if (from === null || lands === null) {
      return `\`${at}\` closes with no \`.ts\`, so \`${key}\` names no file beside it`
    }
    found.push({ key, value, from, to: lands })
  }
  return found
}

function readIn(world: World, at: string): Read {
  const text = world.textOf(at)
  if (text === null) return null
  const said = textsIn(at, text)
  const slug = said.get(SLUG)
  if (slug === undefined) return { refused: `\`${at}\` states no \`${SLUG}\`` }
  if (!slug.startsWith(OPENING)) {
    return { refused: `\`${slug}\` opens with no \`${OPENING}\`, so it names no day` }
  }
  const to = dayAt(slug.slice(OPENING.length))
  if (world.textOf(to) === null) {
    return { refused: `\`${to}\` could not be read, so \`${at}\` folds into nothing` }
  }
  const beside = besideIn(at, to, said)
  if (typeof beside === "string") return { refused: beside }
  return { to, beside }
}

function pagesIn(world: World): readonly string[] {
  return world.index
    .everyOfType(ESO_DAY)
    .map((one) => one.path)
    .sort()
}

export type MergeEsoDayIntoDayAsked = {
  readonly most?: number | null
}

export async function mergeEsoDayIntoDay(
  world: World,
  given: MergeEsoDayIntoDayAsked
): Promise<Answer> {
  const most = given.most ?? null
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
  let done = 0
  for (const at of pagesIn(world)) {
    if (most !== null && done >= most) break
    const read = readIn(over, at)
    if (read === null) continue
    if ("refused" in read) return refusing(read.refused)
    for (const one of read.beside) {
      const moved = await reaching(MOVE_FILE, { from: one.from, to: one.to })
      if (moved !== null) return refusing(`\`${at}\` is refused, and ${moved}`)
      const put = await reaching(ADD_PAGE_PROPERTY, {
        at: read.to,
        key: one.key,
        value: JSON.stringify(one.value),
      })
      if (put !== null) return refusing(`\`${at}\` is refused, and ${put}`)
    }
    const gone = await reaching(REMOVE_FILE, { at })
    if (gone !== null) return refusing(`\`${at}\` is refused, and ${gone}`)
    done += 1
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
  const most = mostIn(given[MOST])
  if (typeof most === "string") return refusing(most)
  return await mergeEsoDayIntoDay(world, { most })
}
