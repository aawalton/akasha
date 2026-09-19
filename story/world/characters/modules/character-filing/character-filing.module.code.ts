import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  foldedFor,
  type Naming,
  type Put,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { theWanderingInn as wanderingInnRead } from "akasha/story/world/pages/the-wandering-inn/stories/read/the-wandering-inn/the-wandering-inn.story-read.ts"
import { theWanderingInn as wanderingInnWorld } from "akasha/story/world/pages/the-wandering-inn/the-wandering-inn.world.ts"
import { storyRead } from "akasha/story/world/stories/read/story-read.page-type.ts"
import { world } from "akasha/story/world/world.page-type.ts"

const PAGE_TYPE = "page-type"
const CHARACTER_PAGE_TYPE = "world-character"
const CHAPTER_PAGE_TYPE = "story-chapter-read"
const STORY_ADDRESS = `${storyRead.slug}/${wanderingInnRead.slug}` as const
const WORLD_ADDRESS = `${world.slug}/${wanderingInnWorld.slug}` as const
const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const
const CHARACTER = "character"
const CLAIMS = "characterClaims"
const JSON_ENDING = ".json"
const NUMBERED = /^\d+\.json$/
const PARTED_BY = "	"

export class FilingRefused extends Error {}

export type Chapter = { readonly slug: string; readonly position: number }

export function chaptersByTitle(root: string): ReadonlyMap<string, Chapter> {
  const asked = asking(root, {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    where: { story: { is: STORY_ADDRESS } },
    keys: ["slug", "title", "position"],
  })
  if ("refused" in asked) {
    throw new FilingRefused(`the chapters went unread, so no claim has a chapter: ${asked.refused}`)
  }
  const held = new Map<string, Chapter>()
  const twice = new Set<string>()
  for (const row of asked.rows) {
    const title = row["title"]
    const slug = row["slug"]
    const position = row["position"]
    if (typeof title !== "string" || typeof slug !== "string") continue
    if (typeof position !== "number") continue
    if (held.has(title)) {
      twice.add(title)
      continue
    }
    held.set(title, { slug, position })
  }
  for (const title of twice) held.delete(title)
  if (held.size === 0) {
    throw new FilingRefused(
      `no chapter of ${STORY_ADDRESS} carries a title, so every reading would be passed over`
    )
  }
  return held
}

export type Claim = {
  readonly chapterSlug: string
  readonly claimField: string
  readonly claimValue: string
  readonly epistemic: string
  readonly claimedBy: string | null
  readonly sourceChapter: string | null
}

export function textOf(held: unknown): string | null {
  if (typeof held === "string") return held === "" ? null : held
  if (typeof held === "number" && Number.isFinite(held)) return String(held)
  return null
}

type Said = Readonly<Record<string, unknown>>

function saidAt(held: unknown): Said | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Said
}

export function claimOf(
  chapterSlug: string,
  claimField: string,
  value: unknown,
  said: Said | null
): Claim | null {
  const claimValue = textOf(value)
  if (claimValue === null) return null
  const epistemic = textOf(said?.["epi"]) ?? "asserted"
  const source = saidAt(said?.["src"])
  return {
    chapterSlug,
    claimField,
    claimValue,
    epistemic,
    claimedBy: textOf(said?.["by"]),
    sourceChapter: textOf(source?.["ch"]),
  }
}

function fromList(
  chapterSlug: string,
  claimField: string,
  held: unknown,
  found: Claim[]
): undefined {
  if (!Array.isArray(held)) return
  for (const one of held) {
    const said = saidAt(one)
    if (said === null) continue
    const claim = claimOf(chapterSlug, claimField, said["v"], said)
    if (claim !== null) found.push(claim)
  }
}

export function claimsIn(sheet: Said, chapterSlug: string): readonly Claim[] {
  const found: Claim[] = []
  const prov = saidAt(sheet["prov"])
  const species = saidAt(sheet["identity"])
  if (species !== null) {
    const claim = claimOf(chapterSlug, "identity", species["v"], species)
    if (claim !== null) found.push(claim)
  }
  const named = claimOf(chapterSlug, "class", sheet["class"], saidAt(prov?.["class"]))
  if (named !== null) found.push(named)
  const leveled = claimOf(chapterSlug, "level", sheet["level"], saidAt(prov?.["level"]))
  if (leveled !== null) found.push(leveled)
  fromList(chapterSlug, "trait", sheet["traits"], found)
  fromList(chapterSlug, "skill", sheet["skills"], found)
  return found
}

export function keyOf(claim: Claim): string {
  return [
    claim.claimField,
    claim.claimValue,
    claim.epistemic,
    claim.claimedBy ?? "",
    claim.sourceChapter ?? "",
  ].join(PARTED_BY)
}

export type Gathered = {
  readonly slug: string
  title: string
  readonly claims: Map<string, Claim>
  first: number | null
  last: number | null
}

export type Reading = {
  readonly characters: ReadonlyMap<string, Gathered>
  readonly filesRead: number
  readonly filesPassed: number
}

function reachedBy(held: Gathered, position: number): undefined {
  if (held.first === null || position < held.first) held.first = position
  if (held.last === null || position > held.last) held.last = position
}

export function readingsUnder(dir: string, chapters: ReadonlyMap<string, Chapter>): Reading {
  const characters = new Map<string, Gathered>()
  let filesRead = 0
  let filesPassed = 0
  const names = readdirSync(dir)
    .filter((name) => name.endsWith(JSON_ENDING) && NUMBERED.test(name))
    .sort((one, two) => Number.parseInt(one, 10) - Number.parseInt(two, 10))
  for (const name of names) {
    const read = JSON.parse(readFileSync(join(dir, name), "utf8")) as Said
    const label = textOf(read["chapter"])
    const chapter = label === null ? undefined : chapters.get(label)
    if (chapter === undefined) {
      filesPassed += 1
      continue
    }
    filesRead += 1
    const entities = read["entities"]
    if (!Array.isArray(entities)) continue
    for (const one of entities) {
      const entity = saidAt(one)
      if (entity === null) continue
      const sheet = saidAt(entity["sheet"])
      if (sheet === null || textOf(sheet["kind"]) !== CHARACTER) continue
      const slug = textOf(entity["externalId"])
      if (slug === null) continue
      const held = characters.get(slug) ?? {
        slug,
        title: textOf(sheet["name"]) ?? slug,
        claims: new Map<string, Claim>(),
        first: null,
        last: null,
      }
      if (!characters.has(slug)) characters.set(slug, held)
      for (const claim of claimsIn(sheet, chapter.slug)) {
        const key = keyOf(claim)
        if (held.claims.has(key)) continue
        held.claims.set(key, claim)
      }
      reachedBy(held, chapter.position)
    }
  }
  return { characters, filesRead, filesPassed }
}

function entryOf(claim: Claim): Value {
  const held: Value = {
    id: uuidVersion7(),
    chapterSlug: claim.chapterSlug,
    claimField: claim.claimField,
    claimValue: claim.claimValue,
    epistemic: claim.epistemic,
  }
  if (claim.claimedBy !== null) held["claimedBy"] = claim.claimedBy
  if (claim.sourceChapter !== null) held["sourceChapter"] = claim.sourceChapter
  return held
}

export function namingOf(held: Gathered): Naming {
  const values: Value = {
    type: namedAs(PAGE_TYPE, CHARACTER_PAGE_TYPE, null),
    slug: held.slug,
    title: held.title,
    world: WORLD_ADDRESS,
  }
  if (held.first !== null) values["firstChapter"] = held.first
  if (held.last !== null) values["lastChapter"] = held.last
  if (held.claims.size > 0) values[CLAIMS] = [...held.claims.values()].map(entryOf)
  return { pageTypeSlug: CHARACTER_PAGE_TYPE, slug: held.slug, values, merge: true }
}

export type Landed = {
  readonly characters: number
  readonly claims: number
  readonly batches: number
  readonly commits: readonly string[]
  readonly filesRead: number
  readonly filesPassed: number
}

export function alreadyHolds(root: string, put: Put): boolean {
  const at = join(root, put.path)
  if (!existsSync(at)) return false
  return readFileSync(at, "utf8") === put.content
}

export async function landBatch(
  root: string,
  named: readonly Naming[],
  message: string,
  landing: Landing,
  done: string[]
): Promise<string | null> {
  const folded = foldedFor(root, named)
  if ("refused" in folded) throw new FilingRefused(`nothing was composed: ${folded.refused}`)
  if (folded.removes.length > 0) {
    throw new FilingRefused(
      `${folded.removes.length} files beside these pages would be taken away, and this takes none`
    )
  }
  const moved = folded.puts.filter((put) => !alreadyHolds(root, put))
  if (moved.length === 0) return null
  const answer = await landing(
    root,
    moved.map((put) => ({ at: PUT, given: { at: put.path, body: put.content } }) as const),
    message,
    { done }
  )
  const wrong = refusalsIn(answer)
  if (wrong.length > 0) throw new FilingRefused(`${message} did not land: ${wrong.join("; ")}`)
  return "commit" in answer ? answer.commit : null
}

export type Filing = {
  readonly root: string
  readonly dir: string
  readonly batch: number
  readonly landing?: Landing
  readonly done?: string[]
}

export async function fileCharacters(filing: Filing): Promise<Landed> {
  const { root, dir, batch } = filing
  const landing = filing.landing ?? runMechanicalChange
  const done = filing.done ?? []
  const chapters = chaptersByTitle(root)
  const read = readingsUnder(dir, chapters)
  const held = [...read.characters.values()].sort((one, two) =>
    one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0
  )
  const commits: string[] = []
  let claims = 0
  let batches = 0
  for (let at = 0; at < held.length; at += batch) {
    const taken = held.slice(at, at + batch)
    for (const one of taken) claims += one.claims.size
    batches += 1
    const message = `file ${taken.length} of ${WORLD_ADDRESS} characters, batch ${batches}`
    const commit = await landBatch(root, taken.map(namingOf), message, landing, done)
    if (commit !== null) commits.push(commit)
  }
  return {
    characters: held.length,
    claims,
    batches,
    commits,
    filesRead: read.filesRead,
    filesPassed: read.filesPassed,
  }
}
