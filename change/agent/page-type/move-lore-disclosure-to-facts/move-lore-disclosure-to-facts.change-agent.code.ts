import {
  type Answer,
  type FileChange,
  refusing,
  type Splice,
  splicedIn,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  without,
  withProperty,
} from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import { claimedIn } from "akasha/change/modules/page-claiming/page-claiming.module.code.ts"
import {
  assignedIn,
  literalIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  editsOver,
  type Page,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { loreDisclosure } from "akasha/story/lore-disclosure/lore-disclosure.page-type.ts"
import { gameMaster } from "akasha/story/lore-disclosure/pages/game-master.lore-disclosure.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import type ts from "typescript"

const DISCLOSURE = "loreDisclosure"

const FACTS = "facts"

const ABOUT = "about"

const SECRETS = "secrets"

const WORLD = "world"

const STORY = "story"

const SLUG = "slug"

const ID = "id"

const TURN_LORE = "lore"

const HELD = "jsonl"

const PARTED = "/"

const LINE = "\n"

const PLAYER_LEVEL = "player"

const SECRET_LEVELS: ReadonlySet<string> = new Set(["world-builder", "wiki"])

export const GAME_MASTER = `${loreDisclosure.slug}/${gameMaster.slug}`

export type Source = {
  readonly path: string
  readonly slug: string
  readonly place: boolean
  readonly about: string | null
  readonly level: string
  readonly facts: readonly string[]
}

export type Told = { readonly fact: string; readonly knowers: readonly string[] }

export type Kept = {
  readonly path: string
  readonly target: string
  readonly about: string | null
  readonly told: readonly Told[]
  readonly secrets: readonly string[]
  readonly absorbed: readonly string[]
}

export type Moved = {
  readonly kept: readonly Kept[]
  readonly factsIn: number
  readonly merged: number
}

type Knowers = readonly string[] | null | { readonly refused: string }

function byPath(one: { readonly path: string }, two: { readonly path: string }): number {
  return one.path < two.path ? -1 : one.path > two.path ? 1 : 0
}

export function storyOf(slug: string, stories: readonly string[]): string | null {
  const begun = stories.filter((one) => slug === one || slug.startsWith(`${one}-`))
  return begun.toSorted((one, two) => two.length - one.length)[0] ?? null
}

export function knowersOf(
  one: Source,
  stories: readonly string[],
  players: ReadonlyMap<string, readonly string[]>
): Knowers {
  if (SECRET_LEVELS.has(one.level)) return null
  if (one.level === gameMaster.slug) return [GAME_MASTER]
  if (one.level !== PLAYER_LEVEL) {
    return {
      refused: `\`${one.path}\` is at \`${one.level}\`, a disclosure this change maps nowhere`,
    }
  }
  const story = storyOf(one.slug, stories)
  const playing = story === null ? [] : (players.get(story) ?? [])
  if (playing.length === 0) {
    return {
      refused: `\`${one.path}\` is told to players, and its slug names no played story with a player character`,
    }
  }
  return [GAME_MASTER, ...playing]
}

function targetOf(one: Source): string | null {
  if (one.place) return `${place.slug}${PARTED}${one.slug}`
  return one.about
}

function keptFirst(members: readonly Source[]): readonly Source[] {
  const placed = members.find((one) => one.place)
  const ranked = members.toSorted(
    (one, two) =>
      two.facts.length - one.facts.length || one.slug.length - two.slug.length || byPath(one, two)
  )
  const first = placed ?? ranked[0]
  if (first === undefined) return []
  return [first, ...members.filter((one) => one !== first).toSorted(byPath)]
}

type Merged = {
  readonly told: readonly Told[]
  readonly secrets: readonly string[]
  readonly merged: number
}

function mergedIn(
  ordered: readonly Source[],
  stories: readonly string[],
  players: ReadonlyMap<string, readonly string[]>
): Merged | { readonly refused: string } {
  const order: string[] = []
  const knowing = new Map<string, readonly string[] | null>()
  let merged = 0
  for (const one of ordered) {
    const knowers = knowersOf(one, stories, players)
    if (knowers !== null && "refused" in knowers) return knowers
    for (const fact of one.facts) {
      if (!knowing.has(fact)) {
        order.push(fact)
        knowing.set(fact, knowers)
        continue
      }
      merged += 1
      const before = knowing.get(fact) ?? null
      if (knowers === null) continue
      knowing.set(
        fact,
        before === null ? knowers : [...before, ...knowers.filter((each) => !before.includes(each))]
      )
    }
  }
  const told: Told[] = []
  const secrets: string[] = []
  for (const fact of order) {
    const knowers = knowing.get(fact) ?? null
    if (knowers === null) secrets.push(fact)
    else told.push({ fact, knowers })
  }
  return { told, secrets, merged }
}

export function movedIn(
  sources: readonly Source[],
  stories: readonly string[],
  players: ReadonlyMap<string, readonly string[]>
): Moved | { readonly refused: string } {
  const groups = new Map<string, Source[]>()
  let counted = 0
  for (const one of sources) {
    const target = targetOf(one)
    if (target === null) {
      return { refused: `\`${one.path}\` states nothing it is about, so no page is kept for it` }
    }
    groups.set(target, [...(groups.get(target) ?? []), one])
    counted += one.facts.length
  }
  const kept: Kept[] = []
  let merged = 0
  for (const [target, members] of groups) {
    const ordered = keptFirst(members)
    const first = ordered[0]
    if (first === undefined) continue
    const facts = mergedIn(ordered, stories, players)
    if ("refused" in facts) return facts
    merged += facts.merged
    kept.push({
      path: first.path,
      target,
      about: first.place || first.about !== null ? null : target,
      told: facts.told,
      secrets: facts.secrets,
      absorbed: ordered.slice(1).map((one) => one.path),
    })
  }
  return { kept: kept.toSorted(byPath), factsIn: counted, merged }
}

export function factsSpelled(told: readonly Told[]): string {
  const records = told.map(
    (one) =>
      `{ fact: ${JSON.stringify(one.fact)}, knowers: [${one.knowers.map((each) => JSON.stringify(each)).join(", ")}] }`
  )
  return `[${records.join(", ")}]`
}

export function secretsSpelled(secrets: readonly string[]): string {
  return secrets.map((one) => `${JSON.stringify(one)}${LINE}`).join("")
}

function factsIn(value: Value): readonly string[] {
  const held = value[FACTS]
  return Array.isArray(held) ? held.filter((one): one is string => typeof one === "string") : []
}

function sourcesIn(world: World): readonly Source[] | { readonly refused: string } {
  const found: Source[] = []
  for (const kind of [lore.slug, place.slug]) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      const slug = textAt(value, SLUG)
      const level = textAt(value, DISCLOSURE)
      if (slug === null) return { refused: `\`${path}\` states no slug` }
      if (level === null) {
        return { refused: `\`${path}\` states no disclosure, so it was moved already` }
      }
      found.push({
        path,
        slug,
        place: kind === place.slug,
        about: textAt(value, ABOUT),
        level: level.slice(level.lastIndexOf(PARTED) + 1),
        facts: factsIn(value),
      })
    }
  }
  return found
}

function playersIn(world: World): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const value of world.index.valuesByPath(characterPlayer.slug).values()) {
    const story = textAt(value, STORY)
    const slug = textAt(value, SLUG)
    if (story === null || slug === null) continue
    const named = story.slice(story.lastIndexOf(PARTED) + 1)
    found.set(named, [...(found.get(named) ?? []), `${characterPlayer.slug}${PARTED}${slug}`])
  }
  return found
}

function storiesIn(world: World): readonly string[] {
  const found: string[] = []
  for (const value of world.index.valuesByPath(storyPlayed.slug).values()) {
    const slug = textAt(value, SLUG)
    if (slug !== null) found.push(slug)
  }
  return found
}

function splicesFor(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  disclosure: ts.PropertyAssignment,
  kept: Kept
): readonly Splice[] {
  const found: Splice[] = []
  const at = owner.properties.indexOf(disclosure)
  found.push(without(text, source, owner, owner.properties, at))
  if (kept.about !== null) {
    found.push(withProperty(text, source, owner, `${ABOUT}: ${JSON.stringify(kept.about)}`, WORLD))
  }
  const puts: string[] = []
  if (kept.told.length > 0) puts.push(`${FACTS}: ${factsSpelled(kept.told)}`)
  if (kept.secrets.length > 0) puts.push(`${SECRETS}: ${JSON.stringify(HELD)}`)
  const facts = assignedIn(owner, FACTS)
  if (facts === null) {
    for (const put of puts) found.push(withProperty(text, source, owner, put, WORLD))
    return found
  }
  if (puts.length === 0) {
    found.push(without(text, source, owner, owner.properties, owner.properties.indexOf(facts)))
    return found
  }
  const started = facts.getStart(source)
  const indent = text.slice(text.lastIndexOf(LINE, started) + 1, started)
  found.push({ from: started, to: facts.getEnd(), put: puts.join(`,${LINE}${indent}`) })
  return found
}

function rewrittenIn(world: World, kept: Kept): readonly FileChange[] | string {
  const text = world.textOf(kept.path)
  if (text === null) return `\`${kept.path}\` could not be read`
  const source = parsedAs(kept.path, text)
  const owner = literalIn(source)
  if (owner === null) return `\`${kept.path}\` exports no object`
  const disclosure = assignedIn(owner, DISCLOSURE)
  if (disclosure === null) return `\`${kept.path}\` states no disclosure`
  const spots = splicesFor(text, source, owner, disclosure, kept)
  const edits: FileChange[] = [...splicedIn(kept.path, text, spots)]
  if (kept.secrets.length > 0) {
    const at = besideAt(kept.path, SECRETS, HELD)
    if (at === null) return `\`${kept.path}\` can hold no file beside it`
    edits.push({ kind: "add", path: at, content: secretsSpelled(kept.secrets) })
  }
  return edits
}

function addressOf(world: World, path: string): string | null {
  const value = world.index.pageByPath(path)
  const slug = value === null ? null : textAt(value, SLUG)
  const kind = path.split(".").at(-2)
  return slug === null || kind === undefined ? null : `${kind}${PARTED}${slug}`
}

function renamingIn(world: World, kept: Kept): readonly Page[] | string {
  const to = addressOf(world, kept.path)
  if (to === null) return `\`${kept.path}\` names no page`
  const pages: Page[] = []
  for (const gone of kept.absorbed) {
    const value = world.index.pageByPath(gone)
    const id = value === null ? null : textAt(value, ID)
    const from = addressOf(world, gone)
    if (id === null || from === null) return `\`${gone}\` names no page`
    for (const namer of world.index.namersOf(id)) {
      if (namer.propertySlug !== TURN_LORE) {
        return `\`${namer.path}\` names \`${gone}\` under \`${namer.propertySlug}\`, which this change does not rewrite`
      }
      pages.push({
        path: namer.path,
        written: [
          { written: "valueGone", key: TURN_LORE, values: [from] },
          { written: "listed", key: TURN_LORE, value: JSON.stringify(to) },
        ],
      })
    }
  }
  return pages
}

function goneIn(world: World, kept: Kept): readonly FileChange[] | string {
  const edits: FileChange[] = []
  for (const at of kept.absorbed) {
    const value = world.index.pageByPath(at)
    if (value === null) return `\`${at}\` names no page`
    const [own, ...beside] = claimedIn(world, at, value)
    for (const path of [...beside, own ?? at]) edits.push({ kind: "remove", path })
  }
  return edits
}

export function moveLoreDisclosureToFacts(world: World): Answer {
  const sources = sourcesIn(world)
  if ("refused" in sources) return refusing(sources.refused)
  if (sources.length === 0) return telling(stating([]), ["no lore or place page is there"])
  const moved = movedIn(sources, storiesIn(world), playersIn(world))
  if ("refused" in moved) return refusing(moved.refused)
  const edits: FileChange[] = []
  for (const kept of moved.kept) {
    const renaming = renamingIn(world, kept)
    if (typeof renaming === "string") return refusing(renaming)
    const renamed = editsOver(world, renaming)
    if (typeof renamed === "string") return refusing(renamed)
    const rewritten = rewrittenIn(world, kept)
    if (typeof rewritten === "string") return refusing(rewritten)
    const going = goneIn(world, kept)
    if (typeof going === "string") return refusing(going)
    edits.push(...renamed, ...rewritten, ...going)
  }
  const told = moved.kept.reduce((sum, one) => sum + one.told.length, 0)
  const secret = moved.kept.reduce((sum, one) => sum + one.secrets.length, 0)
  const gone = moved.kept.reduce((sum, one) => sum + one.absorbed.length, 0)
  return telling(stating(edits), [
    `${sources.length} pages held ${moved.factsIn} facts`,
    `${moved.kept.length} pages keep ${told} told facts, and ${secret} facts are kept as secrets`,
    `${gone} pages folded into the page kept for their target, and ${moved.merged} facts were said twice`,
  ])
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = []

export function runChange(world: World, _given: Asked): Answer {
  return moveLoreDisclosureToFacts(world)
}
