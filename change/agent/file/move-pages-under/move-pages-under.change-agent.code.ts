import { basename, dirname, join } from "node:path"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFilePage } from "akasha/change/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.ts"
import {
  type Answer,
  gathered,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

const MOVE_FILE_PAGE = `${changeMechanicalFile.slug}/${moveFilePage.slug}` as const

const PAGE_TYPE = "page-type"

const BY = "by"

const UNDER = "under"

const AT_MOST = "at-most"

const HERE = "and no page here is carried"

const NOT_TEXT = "states no text"

const MANY = "names more than one page, and a page is carried under one"

const NOT_PARTED = "is no page type and slug parted by a slash"

const NO_PAGE = "reaches no page"

const NO_BODY = "holds no body"

type Asking = {
  readonly pageType: string
  readonly by: string
  readonly under: string
}

type Carry = {
  readonly at: string
  readonly to: string
}

type Found = {
  readonly carries: readonly Carry[]
  readonly over: number
}

type Read = Found | { readonly refused: string }

type Named = { readonly said: string } | { readonly over: true } | { readonly why: string }

type Reached = { readonly folder: string } | { readonly why: string }

function namedIn(held: unknown): Named {
  if (held === undefined || held === null || held === "") return { over: true }
  if (typeof held === "string") return { said: held }
  if (!Array.isArray(held)) return { why: NOT_TEXT }
  const listed = held as readonly unknown[]
  if (listed.length === 0) return { over: true }
  if (listed.length > 1) return { why: MANY }
  const one = listed[0]
  if (typeof one !== "string" || one === "") return { why: NOT_TEXT }
  return { said: one }
}

function reachedFor(world: World, said: string): Reached {
  const address = addressIn(said)
  if (address.kind !== "qualified") return { why: NOT_PARTED }
  const listed = world.index.listedAt(address.pageTypeSlug, address.slug)[0]
  if (listed === undefined) return { why: NO_PAGE }
  return { folder: dirname(listed.path) }
}

function reachedIn(world: World, held: Map<string, Reached>, said: string): Reached {
  const found = held.get(said)
  if (found !== undefined) return found
  const made = reachedFor(world, said)
  held.set(said, made)
  return made
}

function statedIn(at: string, by: string, why: string): string {
  return `\`${at}\` ${why} at \`${by}\`, ${HERE}`
}

function namingIn(at: string, by: string, said: string, why: string): string {
  return `\`${at}\` names \`${said}\` at \`${by}\`, which ${why}, ${HERE}`
}

function nothingIn(over: number): string {
  return `carried 0, passed over ${String(over)}, ${HERE}`
}

function orderedIn(carries: Carry[]): readonly Carry[] {
  return carries.sort((one, two) => (one.at < two.at ? -1 : one.at > two.at ? 1 : 0))
}

function readIn(world: World, asking: Asking): Read {
  if (world.index.listedAt(PAGE_TYPE, asking.pageType).length === 0) {
    return { refused: `\`${asking.pageType}\` names no page type, ${HERE}` }
  }
  const key = exportedAs(asking.by)
  const reaching = new Map<string, Reached>()
  const carries: Carry[] = []
  let over = 0
  for (const kind of world.index.kindsUnder(asking.pageType)) {
    for (const [at, value] of world.index.valuesByPath(kind)) {
      const named = namedIn(value[key])
      if ("over" in named) {
        over += 1
        continue
      }
      if ("why" in named) return { refused: statedIn(at, asking.by, named.why) }
      const reached = reachedIn(world, reaching, named.said)
      if ("why" in reached) {
        return { refused: namingIn(at, asking.by, named.said, reached.why) }
      }
      const to = join(reached.folder, asking.under)
      if (dirname(at) !== to) carries.push({ at, to })
    }
  }
  return { carries: orderedIn(carries), over }
}

async function carriedIn(world: World, found: Found, atMost: number | null): Promise<Answer> {
  const held: Answer[] = []
  let seen = world
  for (const one of found.carries) {
    if (atMost !== null && held.length >= atMost) break
    if (seen.textOf(one.at) === null) return refusing(`\`${one.at}\` ${NO_BODY}, ${HERE}`)
    const to = join(one.to, basename(one.at))
    const carrying = await reach(seen, MOVE_FILE_PAGE, { from: one.at, to })
    const why = carrying.said.refused
    if (why !== null) return refusing(`${why}. \`${one.at}\` is the page, ${HERE}`)
    held.push(carrying.said)
    seen = carrying.world
  }
  if (held.length === 0) return refusing(nothingIn(found.over))
  return gathered(held)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PAGE_TYPE, BY, UNDER, AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const by = given[BY]
  if (by === undefined) return refusing(missing(BY))
  const under = given[UNDER]
  if (under === undefined) return refusing(missing(UNDER))
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  const read = readIn(world, { pageType: pageType.trim(), by: by.trim(), under: under.trim() })
  if ("refused" in read) return refusing(read.refused)
  return await carriedIn(world, read, atMost)
}
