import { expect, test } from "bun:test"
import { definer } from "akasha/agent/role/pages/definer.role.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master/game-master.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import { principalOfPersons } from "akasha/agent/seat/declaration/modules/seat-persons/seat-persons.module.code.ts"
import {
  composeSeatName,
  type NameableSeat,
  personaDefaultsOf,
  principalNamed,
} from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { awenEngineImprovements } from "akasha/domain/initiative/pages/awen-engine-improvements.initiative.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { awen } from "akasha/persona/pages/awen/awen.persona.ts"
import { iris } from "akasha/persona/pages/iris/iris.persona.ts"
import { climb } from "akasha/story/world/pages/climb/stories/written/climb/climb.story-written.ts"

const ROOT = rootOf(import.meta.dir)

function alans(persona: string, role: string, domain: string): NameableSeat {
  return { attributes: { persona, domain, role }, flex: null, principal: alan.slug }
}

test("a seat of Alan's whose domain is a game is named for its persona, role and game", () => {
  expect(composeSeatName(alans(iris.slug, gameMaster.slug, climb.slug), ROOT)).toBe(
    "iris-game-master-climb"
  )
  expect(composeSeatName(alans(iris.slug, worldBuilder.slug, climb.slug), ROOT)).toBe(
    "iris-world-builder-climb"
  )
})

test("a persona's game master seat and world builder seat on one game are two names", () => {
  const master = composeSeatName(alans(iris.slug, gameMaster.slug, climb.slug), ROOT)
  const builder = composeSeatName(alans(iris.slug, worldBuilder.slug, climb.slug), ROOT)
  expect(master).not.toBe(builder)
})

test("two seats of one persona, role and game are parted by the flex each carries", () => {
  const one = { ...alans(iris.slug, gameMaster.slug, climb.slug), flex: "flex-1" }
  const two = { ...alans(iris.slug, gameMaster.slug, climb.slug), flex: "flex-2" }
  expect(composeSeatName(one, ROOT)).toBe("iris-game-master-climb-flex-1")
  expect(composeSeatName(two, ROOT)).toBe("iris-game-master-climb-flex-2")
})

test("a seat of Alan's whose domain is no game keeps its persona's name alone", () => {
  expect(composeSeatName(alans(awen.slug, definer.slug, awenEngineImprovements.slug), ROOT)).toBe(
    awen.slug
  )
})

test("a persona championing no domain seats in the akasha domain", () => {
  expect(personaDefaultsOf(ROOT, iris.slug)?.domain).toBe("akasha")
})

test("a seat of several persons with a persona of its own is named for that persona", () => {
  expect(
    composeSeatName(
      {
        attributes: { persona: "claudius", domain: "couples-therapy", role: "couples-therapist" },
        flex: null,
        principal: principalOfPersons([alan.slug, "jenny"]),
      },
      ROOT
    )
  ).toBe("claudius")
})

test("a seat of several persons with the default persona is named for its domain and role", () => {
  expect(
    composeSeatName(
      {
        attributes: { persona: "claude", domain: "couples-therapy", role: "recorder" },
        flex: null,
        principal: principalOfPersons([alan.slug, "jenny"]),
      },
      ROOT
    )
  ).toBe("couples-therapy-recorder")
})

test("a principal is the fleet, a person, or several persons each named once", () => {
  expect(principalNamed(ROOT, "agent")).toBe(true)
  expect(principalNamed(ROOT, alan.slug)).toBe(true)
  expect(principalNamed(ROOT, principalOfPersons([alan.slug, "jenny"]))).toBe(true)
  expect(principalNamed(ROOT, principalOfPersons([alan.slug, alan.slug]))).toBe(false)
  expect(principalNamed(ROOT, principalOfPersons([alan.slug, iris.slug]))).toBe(false)
  expect(principalNamed(ROOT, principalOfPersons([alan.slug, "agent"]))).toBe(false)
})

test("a seat working for the fleet on a game is named for the game and its role", () => {
  expect(
    composeSeatName(
      {
        attributes: { persona: null, domain: climb.slug, role: gameMaster.slug },
        flex: null,
        principal: "agent",
      },
      ROOT
    )
  ).toBe("climb-game-master")
})
