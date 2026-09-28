import { expect, test } from "bun:test"
import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { storyRecorder } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { role } from "akasha/agent/role/role.page-type.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  definedIn,
  definingRefused,
  type Knowing,
  roleOf,
} from "akasha/command/modules/mechanic-defining/mechanic-defining.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { worldCharacter } from "akasha/story/world/characters/world-character.page-type.ts"
import { worldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"

function roleNamed(slug: string): Value {
  return { role: `${role.slug}/${slug}` }
}

function targeting(slug: string): Value {
  return { targetPageType: `${pageType.slug}/${slug}` }
}

const PAGES: Record<string, Value> = {
  "seat/gm": roleNamed(gameMaster.slug),
  "seat/wb": roleNamed(worldBuilder.slug),
  "seat/rec": roleNamed(storyRecorder.slug),
  "subagent/rec-sub": { principalSeatName: "seat/rec" },
  "relation-property/holding-skill": targeting(worldSkill.slug),
  "relation-property/holding-character": targeting(worldCharacter.slug),
  "multi-relation-property/between-characters": targeting(worldCharacter.slug),
  "multi-relation-property/some-skills": targeting(worldSkill.slug),
}

const KINDS: ReadonlySet<string> = new Set([
  "world-mechanic",
  "world-skill",
  "held-skill",
  "world-item",
  "mana-meter",
  worldRelationship.slug,
  "skill-set",
  "guild",
])

const CHARACTERS: ReadonlySet<string> = new Set([worldCharacter.slug])

const RELATION = "relation-property"

const MULTI = "multi-relation-property"

const DECLARED: Record<string, ReturnType<Knowing["declarationsOf"]>> = {
  "held-skill": [
    { required: true, pageTypeSlug: RELATION, pagePropertySlug: "holding-character" },
    { required: true, pageTypeSlug: RELATION, pagePropertySlug: "holding-skill" },
  ],
  "mana-meter": [{ required: true, pageTypeSlug: RELATION, pagePropertySlug: "holding-character" }],
  [worldRelationship.slug]: [
    { required: true, pageTypeSlug: MULTI, pagePropertySlug: "between-characters" },
  ],
  "skill-set": [{ required: true, pageTypeSlug: MULTI, pagePropertySlug: "some-skills" }],
  guild: [{ required: false, pageTypeSlug: MULTI, pagePropertySlug: "between-characters" }],
}

const INDEX: Knowing = {
  pageAt: (type, slug) => PAGES[`${type}/${slug}`] ?? null,
  kindsUnder: (slug) => (slug === worldCharacter.slug ? CHARACTERS : KINDS),
  declarationsOf: (type) => DECLARED[type] ?? [],
}

const THERE = "world/mechanics/skills/old.world-skill.ts"

function bodyOf(path: string): string | null {
  return path === THERE ? "export const old = {}\n" : null
}

function added(path: string): FileChange {
  return { kind: "add", path, content: "export const one = {}\n" }
}

const SKILL_AT = "world/mechanics/skills/new.world-skill.ts"

const ITEM_AT = "story/items/coin.world-item.ts"

const SKILL = added(SKILL_AT)

const ITEM = added(ITEM_AT)

const HELD = added("story/skills/nala-new.held-skill.ts")

const LORE = added("world/lore/hall.lore.ts")

const GM = "agent/seat/pages/gm/gm.seat.ts"

test("a new skill or item page is a definition, and a holding or other page is not", () => {
  expect(definedIn(INDEX, bodyOf, [SKILL, ITEM, HELD, LORE])).toEqual([SKILL_AT, ITEM_AT])
})

test("a page tracking a character already defined brings no new lore, and defines nothing", () => {
  const meter = added("story/metrics/nala.mana-meter.ts")
  expect(definedIn(INDEX, bodyOf, [meter])).toEqual([])
  expect(definingRefused(INDEX, bodyOf, GM, [meter])).toEqual([])
})

test("a relationship between characters already defined is kept by a recorder, and defines nothing", () => {
  const at = `story/mechanics/relationships/nala-maro.${worldRelationship.slug}.ts`
  const rec = "agent/seat/pages/rec/rec.seat.ts"
  const set = added("story/mechanics/sets/nala.skill-set.ts")
  expect(definedIn(INDEX, bodyOf, [added(at), set])).toEqual([])
  expect(definingRefused(INDEX, bodyOf, rec, [added(at)])).toEqual([])
})

test("a kind naming characters only where it may is still a definition", () => {
  const at = "story/mechanics/guilds/weavers.guild.ts"
  expect(definedIn(INDEX, bodyOf, [added(at)])).toEqual([at])
})

test("a page already there is changed rather than defined", () => {
  expect(definedIn(INDEX, bodyOf, [added(THERE)])).toEqual([])
})

test("a game master defining a mechanic is refused and told to ask the world builder", () => {
  const said = definingRefused(INDEX, bodyOf, GM, [SKILL])
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(SKILL_AT)
  expect(said[0]).toContain("ask the world builder")
})

test("a game master may still grant a holding", () => {
  expect(definingRefused(INDEX, bodyOf, GM, [HELD])).toEqual([])
})

test("the world builder defines freely", () => {
  expect(definingRefused(INDEX, bodyOf, "agent/seat/pages/wb/wb.seat.ts", [SKILL])).toEqual([])
})

test("a subagent is held to the role of the seat running it", () => {
  const page = "agent/subagent/pages/rec-sub/rec-sub.subagent.ts"
  expect(roleOf(INDEX, page)).toBe("story-recorder")
  expect(definingRefused(INDEX, bodyOf, page, [ITEM])).toHaveLength(1)
})

test("a caller with no seat is let through", () => {
  expect(definingRefused(INDEX, bodyOf, "person/pages/alan/alan.person.ts", [SKILL])).toEqual([])
})
