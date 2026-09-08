import { dirname, extname } from "node:path"
import { partedIn } from "@akasha/pages/page-file-name"
import { gathered, refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import {
  type Reaches,
  reach,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../../modules/page-claiming/page-claiming.module.code.ts"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

const RENAME_PAGE_ADDRESS = "change-mechanical-file-content/rename-page-address"

const CHANGE_FILE_CONTENT = "change-mechanical-file-content/change-file-content"

const MOVE_FILE_CODE = "change-mechanical/move-file-code"

const MOVE_FILE = "change-mechanical-file/move-file"

const PAGE_TYPE = "page-type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const CODE = new Set([".ts", ".tsx"])

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

type Read =
  | { readonly filed: readonly Filed[]; readonly folders: readonly string[] }
  | { readonly refused: string }

type Carried =
  | { readonly answers: readonly Answer[]; readonly world: World }
  | { readonly refused: string }

function why(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause)
}

function readIn(world: World, at: string, was: string): Read {
  const found: Filed[] = []
  try {
    for (const [path, value] of world.index.valuesByPath(was)) {
      const said = partedIn(path)
      if (said === null) return { refused: `\`${path}\` reads as no page file` }
      found.push({ at: path, slug: said.slug, claimed: claimedIn(world, path, value) })
    }
    return { filed: found, folders: world.index.foldersIn(dirname(at)) }
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
  let held = await heldOver(world, answers, RENAME_PAGE_ADDRESS, {
    was: `${was}/${one.slug}`,
    now: `${now}/${one.slug}`,
  })
  if ("refused" in held) return held
  for (const [from, to] of moved) {
    const named = CODE.has(extname(from)) ? MOVE_FILE_CODE : MOVE_FILE
    held = await heldOver(held.world, held.answers, named, { from, to })
    if ("refused" in held) return held
  }
  return await heldOver(held.world, held.answers, CHANGE_FILE_CONTENT, {
    at: lands,
    old: `${PAGE_TYPE_SLUG}: "${was}"`,
    new: `${PAGE_TYPE_SLUG}: "${now}"`,
  })
}

function landedIn(said: Answer, at: string): string | null {
  for (const one of said.edits) {
    if (one.kind === "move" && one.pathFrom === at) return one.pathTo
  }
  return null
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0 || said.pageType !== PAGE_TYPE) {
    return refusing(`\`${given.at}\` names no page type, so no page type is renamed`)
  }
  const was = said.slug
  const read = readIn(world, given.at, was)
  if ("refused" in read) return refusing(`${read.refused}, so no page type is renamed`)
  const folder = dirname(given.at)
  const typed = await reach(world, RENAME_FILE_PAGE, {
    at: given.at,
    to: given.to,
    plural: given.plural,
  })
  if (typed.said.refused !== null) return typed.said
  const lands = landedIn(typed.said, given.at)
  if (lands !== null && dirname(lands) !== folder && read.folders.length > 0) {
    return refusing(`\`${folder}\` holds folders the carry to \`${dirname(lands)}\` leaves behind`)
  }
  let answers: readonly Answer[] = [typed.said]
  let seen = typed.world
  for (const one of read.filed) {
    const carried = await pageAnew(seen, answers, one, was, given.to)
    if ("refused" in carried) return refusing(carried.refused)
    answers = carried.answers
    seen = carried.world
  }
  return gathered(answers)
}
