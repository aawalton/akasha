import { expect, test } from "bun:test"
import { definer } from "akasha/agent/role/pages/definer.role.ts"
import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import { worldBuilder } from "akasha/agent/role/pages/world-builder.role.ts"
import {
  composeSeatName,
  type NameableSeat,
} from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { awenEngineImprovements } from "akasha/domain/initiative/pages/awen-engine-improvements.initiative.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { awen } from "akasha/persona/pages/awen/awen.persona.ts"
import { iris } from "akasha/persona/pages/iris/iris.persona.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const ROOT = rootOf(import.meta.dir)

function alans(persona: string, role: string, domain: string): NameableSeat {
  return { attributes: { persona, domain, role }, flex: null, principal: alan.slug }
}

test("a seat of Alan's whose domain is a game is named for its persona, role and game", () => {
  expect(composeSeatName(alans(iris.slug, gameMaster.slug, theTower.slug), ROOT)).toBe(
    "iris-game-master-the-tower"
  )
  expect(composeSeatName(alans(iris.slug, worldBuilder.slug, theTower.slug), ROOT)).toBe(
    "iris-world-builder-the-tower"
  )
})

test("a persona's game master seat and world builder seat on one game are two names", () => {
  const master = composeSeatName(alans(iris.slug, gameMaster.slug, theTower.slug), ROOT)
  const builder = composeSeatName(alans(iris.slug, worldBuilder.slug, theTower.slug), ROOT)
  expect(master).not.toBe(builder)
})

test("a seat of Alan's whose domain is no game keeps its persona's name alone", () => {
  expect(composeSeatName(alans(awen.slug, definer.slug, awenEngineImprovements.slug), ROOT)).toBe(
    awen.slug
  )
})

test("a seat working for the fleet on a game is named for the game and its role", () => {
  expect(
    composeSeatName(
      {
        attributes: { persona: null, domain: theTower.slug, role: gameMaster.slug },
        flex: null,
        principal: "agent",
      },
      ROOT
    )
  ).toBe("the-tower-game-master")
})
