import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  Query,
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { beatsIn } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { activeSlots } from "akasha/story/world/mechanics/ability-kinds/properties/active-slots.number-property.ts"
import { pluralTitle } from "akasha/story/world/mechanics/ability-kinds/properties/plural-title.text-property.ts"
import { worldAbilityKind } from "akasha/story/world/mechanics/ability-kinds/world-ability-kind.page-type.ts"
import {
  type Holding,
  type SlotKind,
  slotted,
  type Wanted,
} from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { heldSkillDormant } from "akasha/story/world/mechanics/skills/character-skill/properties/held-skill-dormant.boolean-property.ts"
import { abilityKind } from "akasha/story/world/mechanics/skills/properties/ability-kind.relation-property.ts"
import { skillTierSteps } from "akasha/story/world/mechanics/skills/properties/skill-tier-steps.number-property.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { roleplayed } from "akasha/story/world/stories/played/properties/roleplayed.boolean-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  makingRefused,
  stepIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { latestAsked } from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const WRITER = "sheet <sheet@alanwalton.com>"

const SLUG = "slug"

const TITLE = "title"

const CHARACTER = "character"

const SKILL = "skill"

const STORY = "story"

const EXPERIENCE = "experience"

const POSITION = "position"

const STATUS = "stepStatus"

const PROSE = "prose"

const BEATS = "beats"

const DORMANT = exportedAs(heldSkillDormant.propertySlug)

const KIND = exportedAs(abilityKind.propertySlug)

const TIER_STEPS = exportedAs(skillTierSteps.propertySlug)

const SLOTS = exportedAs(activeSlots.propertySlug)

const PLURAL = exportedAs(pluralTitle.propertySlug)

const ROLEPLAYED = roleplayed.propertySlug

const PARTED = "/"

const BREAK = "\n"

export type Calls = {
  readonly ask: (query: Query) => Promise<Rows>
  readonly write: (asked: Writing) => Promise<Wrote>
}

export type HeldSet =
  | { readonly kind: "set"; readonly event: string; readonly turn: string }
  | { readonly kind: "refused"; readonly said: string }
  | { readonly kind: "unread"; readonly why: string }

const CALLS: Calls = {
  ask: (query) => askingFor(query),
  write: (asked) => writingFor(asked),
}

type Skilled = {
  readonly title: string
  readonly kind: string | null
  readonly tierSteps: readonly number[]
}

function numberIn(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function numbersIn(value: unknown): readonly number[] {
  return Array.isArray(value) ? value.filter((one): one is number => numberIn(one) !== null) : []
}

function dormantIn(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null
}

function addressOf(type: string, slug: string): string {
  return `${type}${PARTED}${slug}`
}

function bySlug(slug: string, keys: readonly string[], type: string): Query {
  return { pageTypeSlug: type, where: { [SLUG]: { is: slug } }, keys: [...keys] }
}

function skilledIn(rows: readonly Row[]): ReadonlyMap<string, Skilled> {
  const skilled = new Map<string, Skilled>()
  for (const row of rows) {
    const slug = textIn(row[SLUG])
    if (slug === null) continue
    skilled.set(addressOf(worldSkill.slug, slug), {
      title: textIn(row[TITLE]) ?? slug,
      kind: textIn(row[KIND]),
      tierSteps: numbersIn(row[TIER_STEPS]),
    })
  }
  return skilled
}

function holdingOf(row: Row, skilled: ReadonlyMap<string, Skilled>): Holding | null {
  const slug = textIn(row[SLUG])
  const skill = skilled.get(textIn(row[SKILL]) ?? "")
  if (slug === null || skill === undefined) return null
  return {
    page: addressOf(characterSkill.slug, slug),
    title: skill.title,
    kind: skill.kind,
    experience: numberIn(row[EXPERIENCE]) ?? 0,
    dormant: dormantIn(row[DORMANT]),
    tierSteps: skill.tierSteps,
  }
}

function kindIn(row: Row | undefined): SlotKind | null {
  const slug = textIn(row?.[SLUG])
  if (row === undefined || slug === null) return null
  return {
    page: addressOf(worldAbilityKind.slug, slug),
    title: textIn(row[TITLE]) ?? slug,
    pluralTitle: textIn(row[PLURAL]) ?? slug,
    activeSlots: numberIn(row[SLOTS]),
  }
}

function makingOf(row: Row | undefined): string | null {
  const slug = textIn(row?.[SLUG])
  const position = row?.[POSITION]
  if (row === undefined || slug === null || typeof position !== "number") {
    return makingRefused(null)
  }
  return makingRefused({
    slug,
    position,
    collections: [],
    unit: null,
    status: stepIn(row[STATUS]),
    told: row[ROLEPLAYED] === true && row[PROSE] !== undefined,
  })
}

export function beatsAdded(body: string, beat: Readonly<Record<string, unknown>>): string {
  const held = body.trimEnd()
  return `${held === "" ? "" : `${held}${BREAK}`}${JSON.stringify(beat)}${BREAK}`
}

type Found = { readonly rows: readonly Row[]; readonly at?: string } | { readonly unread: string }

async function found(calls: Calls, query: Query): Promise<Found> {
  const asked = await calls.ask(query)
  if ("refused" in asked) return { unread: asked.refused }
  return asked.at === undefined ? { rows: asked.rows } : { rows: asked.rows, at: asked.at }
}

export async function heldAbilitySet(
  game: string,
  held: string,
  wanted: Wanted,
  calls: Calls = CALLS
): Promise<HeldSet> {
  const address = addressIn(held)
  if (address.kind !== "qualified" || address.pageTypeSlug !== characterSkill.slug) {
    return { kind: "refused", said: `\`${held}\` names no held skill.` }
  }
  const turns = await found(calls, latestAsked(game))
  if ("unread" in turns) return { kind: "unread", why: turns.unread }
  const latest = turns.rows[0]
  const making = makingOf(latest)
  const turn = textIn(latest?.[SLUG])
  if (making !== null || turn === null) return { kind: "refused", said: making ?? "" }
  const body = latest?.[BEATS]
  if (typeof body !== "string") {
    return { kind: "refused", said: `The last turn, \`${turn}\`, holds no beats yet.` }
  }
  const beats = beatsIn(body)
  if ("refused" in beats) {
    return { kind: "refused", said: `The last turn's beats do not read: ${beats.refused}` }
  }
  const holdings = await found(
    calls,
    bySlug(address.slug, [SLUG, CHARACTER, SKILL, EXPERIENCE, DORMANT], characterSkill.slug)
  )
  if ("unread" in holdings) return { kind: "unread", why: holdings.unread }
  const one = holdings.rows[0]
  const character = textIn(one?.[CHARACTER])
  const skill = textIn(one?.[SKILL])
  if (one === undefined || character === null || skill === null) {
    return { kind: "refused", said: `\`${held}\` names no held skill.` }
  }
  const players = await found(calls, bySlug(slugOf(character), [SLUG, STORY], characterPlayer.slug))
  if ("unread" in players) return { kind: "unread", why: players.unread }
  if (textIn(players.rows[0]?.[STORY]) !== addressOf(storyPlayed.slug, game)) {
    return { kind: "refused", said: `\`${held}\` is held by no one playing \`${game}\`.` }
  }
  const skills = await found(
    calls,
    bySlug(slugOf(skill), [SLUG, TITLE, KIND, TIER_STEPS], worldSkill.slug)
  )
  if ("unread" in skills) return { kind: "unread", why: skills.unread }
  const kindAddress = textIn(skills.rows[0]?.[KIND])
  const kinds =
    kindAddress === null
      ? { rows: [] }
      : await found(
          calls,
          bySlug(slugOf(kindAddress), [SLUG, TITLE, PLURAL, SLOTS], worldAbilityKind.slug)
        )
  if ("unread" in kinds) return { kind: "unread", why: kinds.unread }
  const ofKind =
    kindAddress === null
      ? { rows: [] }
      : await found(calls, {
          pageTypeSlug: worldSkill.slug,
          where: { [KIND]: { is: kindAddress } },
          keys: [SLUG, TITLE, KIND, TIER_STEPS],
        })
  if ("unread" in ofKind) return { kind: "unread", why: ofKind.unread }
  const mine = await found(calls, {
    pageTypeSlug: characterSkill.slug,
    where: { [CHARACTER]: { is: character } },
    keys: [SLUG, SKILL, EXPERIENCE, DORMANT],
  })
  if ("unread" in mine) return { kind: "unread", why: mine.unread }
  const skilled = skilledIn([...ofKind.rows, ...skills.rows])
  const target = holdingOf(one, skilled)
  if (target === null) {
    return { kind: "refused", said: `\`${held}\` names a skill that is not here.` }
  }
  const others = mine.rows.flatMap((row) => holdingOf(row, skilled) ?? [])
  const answer = slotted(target, kindIn(kinds.rows[0]), others, wanted)
  if ("refused" in answer) return { kind: "refused", said: answer.refused }
  const beat = { beat: beats.beats.length + 1, event: answer.event, changes: answer.changes }
  const values = Object.fromEntries(answer.changes.map((change) => [change.key, change.to]))
  const wrote = await calls.write({
    writer: WRITER,
    ...(turns.at === undefined ? {} : { read: turns.at }),
    message: `${answer.event} ${game}'s sheet adds it to ${turn}`,
    pages: [
      {
        pageTypeSlug: storyTurnPlayed.slug,
        slug: turn,
        merge: true,
        values: {},
        bodies: { [BEATS]: beatsAdded(body, beat) },
      },
      { pageTypeSlug: characterSkill.slug, slug: address.slug, merge: true, values },
    ],
  })
  if ("refused" in wrote) return { kind: "unread", why: wrote.refused }
  return { kind: "set", event: answer.event, turn }
}
