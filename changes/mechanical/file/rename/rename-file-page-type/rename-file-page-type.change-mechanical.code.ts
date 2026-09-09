import { extname } from "node:path"
import { besideAt, partedIn } from "@akasha/pages/page-file-name"
import { typedAs } from "../../../../../pages/export-name/page-export-name.module.code.ts"
import { importingOf } from "../../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { gathered, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { claimedIn } from "../../../../modules/page-claiming/page-claiming.module.code.ts"
import {
  type Reaches,
  reach,
  type World,
} from "../../../../modules/shadow/change-shadow.module.code.ts"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

const RENAME_PAGE_ADDRESSES = "change-mechanical-file-content/rename-page-addresses"

const CHANGE_FILE_CONTENT = "change-mechanical-file-content/change-file-content"

const MOVE_FILE_CODE = "change-mechanical/move-file-code"

const MOVE_FILE = "change-mechanical-file/move-file"

const RENAME_EXPORT = "change-mechanical-file-content/rename-export"

const PAGE_TYPE = "page-type"

const PAGE_TYPE_KEY = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const CODE = new Set([".ts", ".tsx"])

const WORKED = "worked"

const HOLDS = "ts"

const WORKED_NAME = "Worked"

export type Asked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
}

type Filed = {
  readonly at: string
  readonly slug: string
  readonly claimed: readonly string[]
}

type Read = { readonly filed: readonly Filed[] } | { readonly refused: string }

type Carried =
  | { readonly answers: readonly Answer[]; readonly world: World }
  | { readonly refused: string }

function why(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause)
}

function readIn(world: World, was: string): Read {
  const found: Filed[] = []
  try {
    for (const [path, value] of world.index.valuesByPath(was)) {
      const said = partedIn(path)
      if (said === null) return { refused: `\`${path}\` reads as no page file` }
      found.push({ at: path, slug: said.slug, claimed: claimedIn(world, path, value) })
    }
    return { filed: found }
  } catch (cause) {
    return { refused: why(cause) }
  }
}

function renamedInto(
  world: World,
  claimed: readonly string[],
  was: string,
  now: string
): ReadonlyMap<string, string> | string {
  const said = new Map<string, string>()
  for (const one of claimed) {
    const held = one.replace(`.${was}.`, `.${now}.`)
    if (held === one) return `\`${one}\` names no \`${was}\`, so that file is carried nowhere`
    if (world.bodyOf(held) !== null) return `\`${held}\` is a body already`
    said.set(one, held)
  }
  return said
}

async function heldOver(
  world: World,
  answers: readonly Answer[],
  at: Reaches,
  given: unknown
): Promise<Carried> {
  const carried = await reach(world, at, given)
  if (carried.said.refused !== null) return { refused: carried.said.refused }
  return { answers: [...answers, carried.said], world: carried.world }
}

function addressesIn(filed: readonly Filed[], was: string, now: string): Record<string, string> {
  const moved: Record<string, string> = {}
  for (const one of filed) moved[`${was}/${one.slug}`] = `${now}/${one.slug}`
  return moved
}

async function carriedOver(held: Carried, moved: ReadonlyMap<string, string>): Promise<Carried> {
  let carried = held
  for (const [from, to] of moved) {
    if ("refused" in carried) return carried
    const named = CODE.has(extname(from)) ? MOVE_FILE_CODE : MOVE_FILE
    carried = await heldOver(carried.world, carried.answers, named, { from, to })
  }
  return carried
}

function keyAt(world: World, at: string, was: string): string {
  if (world.textOf(at)?.includes(`${PAGE_TYPE_KEY}: "${was}"`) === true) return PAGE_TYPE_KEY
  return PAGE_TYPE_SLUG
}

async function pageAnew(
  world: World,
  answers: readonly Answer[],
  one: Filed,
  was: string,
  now: string
): Promise<Carried> {
  const moved = renamedInto(world, one.claimed, was, now)
  if (typeof moved === "string") return { refused: moved }
  const lands = moved.get(one.at)
  if (lands === undefined) return { refused: `\`${one.at}\` names no file the page type carries` }
  const held = await carriedOver({ answers, world }, moved)
  if ("refused" in held) return held
  const key = keyAt(held.world, lands, was)
  return await heldOver(held.world, held.answers, CHANGE_FILE_CONTENT, {
    at: lands,
    old: `${key}: "${was}"`,
    new: `${key}: "${now}"`,
  })
}

function workedIn(world: World, now: string): string | null {
  const listed = world.index.listedAt(PAGE_TYPE, now)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  if (at === undefined) return null
  const beside = besideAt(at, WORKED, HOLDS)
  if (beside === null || world.textOf(beside) === null) return null
  return beside
}

async function workedAnew(
  world: World,
  answers: readonly Answer[],
  was: string,
  now: string
): Promise<Carried> {
  const at = workedIn(world, now)
  if (at === null) return { answers, world }
  const reading = importingOf(world.index, new Map([[at, at]]))
  if ("unread" in reading) return { refused: reading.unread }
  return await heldOver(world, answers, RENAME_EXPORT, {
    at,
    over: [at, ...reading.importers],
    of: `${WORKED_NAME}${typedAs(was)}`,
    to: `${WORKED_NAME}${typedAs(now)}`,
  })
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0 || said.pageType !== PAGE_TYPE) {
    return refusing(`\`${given.at}\` names no page type, so no page type is renamed`)
  }
  const was = said.slug
  const read = readIn(world, was)
  if ("refused" in read) return refusing(`${read.refused}, so no page type is renamed`)
  const typed = await reach(world, RENAME_FILE_PAGE, {
    at: given.at,
    to: given.to,
    plural: given.plural,
  })
  if (typed.said.refused !== null) return typed.said
  let answers: readonly Answer[] = [typed.said]
  let seen = typed.world
  if (read.filed.length > 0) {
    const restated = await heldOver(seen, answers, RENAME_PAGE_ADDRESSES, {
      moved: addressesIn(read.filed, was, given.to),
    })
    if ("refused" in restated) return refusing(restated.refused)
    answers = restated.answers
    seen = restated.world
  }
  for (const one of read.filed) {
    const carried = await pageAnew(seen, answers, one, was, given.to)
    if ("refused" in carried) return refusing(carried.refused)
    answers = carried.answers
    seen = carried.world
  }
  const worked = await workedAnew(seen, answers, was, given.to)
  if ("refused" in worked) return refusing(worked.refused)
  return gathered(worked.answers)
}
