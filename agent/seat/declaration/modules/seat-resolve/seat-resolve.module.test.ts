import { expect, test } from "bun:test"
import {
  defaulted,
  defaultFor,
  defaultSlots,
  GAME,
  gameAt,
  gamesFound,
  personaIsDefault,
  resolveAttributes,
} from "akasha/agent/seat/declaration/modules/seat-resolve/seat-resolve.module.code.ts"
import { role as seatRole } from "akasha/agent/seat/properties/role.relation-property.ts"
import { seatPersona } from "akasha/agent/seat/properties/seat-persona.relation-property.ts"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { relationProperty } from "akasha/page/relation-property/relation-property.page-type.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.story-game.ts"

const ROOT = rootOf(import.meta.dir)

const UNDECLARED = ""

function declaredDefault(property: string): string {
  const stated = seat.properties.find((one) => one.pageProperty === property)
  if (stated === undefined || !("default" in stated)) return UNDECLARED
  return slugOf(String(stated.default))
}

const PERSONA = declaredDefault(`${relationProperty.slug}/${seatPersona.slug}`)

const ROLE = declaredDefault(`${relationProperty.slug}/${seatRole.slug}`)

test("the seat page type declares a persona and a role for a seat that states neither", () => {
  expect(PERSONA).not.toBe(UNDECLARED)
  expect(ROLE).not.toBe(UNDECLARED)
})

test("a default is read under the slug of the property declaring it", () => {
  expect(defaultFor("persona", ROOT)).toBe(PERSONA)
  expect(defaultFor("role", ROOT)).toBe(ROLE)
})

test("a default stated as a page's address is read as the slug that address names", () => {
  expect(defaultFor("persona", ROOT)).not.toContain("/")
  expect(defaultFor("role", ROOT)).not.toContain("/")
})

test("every slot the seat page type gives a default is a slot a default is taken for", () => {
  expect(defaultSlots(ROOT)).toEqual(["persona", "role"])
})

test("a slot the seat page type gives no default is left to the caller", () => {
  expect(defaultFor("domain", ROOT)).toBeNull()
})

test("the persona a seat takes when none is stated is that persona's default", () => {
  expect(personaIsDefault(ROOT, PERSONA)).toBe(true)
  expect(personaIsDefault(ROOT, "abby")).toBe(false)
})

test("a seat stating neither slot takes the default of each", () => {
  expect(defaulted({}, ROOT)).toEqual({ persona: PERSONA, role: ROLE, roleIsDefault: true })
})

test("a seat stating a role keeps that role and still takes the default persona", () => {
  expect(defaulted({ role: "recorder" }, ROOT)).toEqual({
    persona: PERSONA,
    role: "recorder",
    roleIsDefault: false,
  })
})

const THE_TOWER = theTower.slug

test("a game is found in the domain slot by its address and by its bare slug", () => {
  const at = gameAt(ROOT, THE_TOWER)
  expect(at).not.toBeNull()
  const { slugs } = gamesFound(ROOT)
  expect(slugs.get(`${GAME}/${THE_TOWER}`)).toBe(at as string)
  expect(slugs.get(THE_TOWER)).toBe(at as string)
})

test("a seat stating a game as its domain resolves rather than being refused", () => {
  const stated = { persona: "iris", role: "game-master", domain: THE_TOWER }
  const resolved = resolveAttributes(stated, [], ROOT, gamesFound(ROOT))
  expect("refusals" in resolved).toBe(false)
  if ("assigned" in resolved) {
    expect(resolved.assigned.find((one) => one.slot === "domain")?.relPath).toBe(
      gameAt(ROOT, THE_TOWER)
    )
  }
})

test("a slug naming no game is still refused in the domain slot", () => {
  const resolved = resolveAttributes({ domain: "no-game-is-this" }, [], ROOT, gamesFound(ROOT))
  expect("refusals" in resolved).toBe(true)
})

test("a seat stating a persona keeps that persona", () => {
  expect(defaulted({ persona: "abby", role: "interviewer" }, ROOT)).toEqual({
    persona: "abby",
    role: "interviewer",
    roleIsDefault: false,
  })
})
