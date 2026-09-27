import { expect, test } from "bun:test"
import {
  type LoreLooking,
  loreNamed,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"

const GRACE = "character-other/grace"

const ECHO = "character-other/echo"

const GRACE_LORE = "world/lore/grace.lore.ts"

const GRACE_PERSONA_LORE = "world/lore/grace-persona.lore.ts"

const ECHO_LORE = "world/lore/echo.lore.ts"

const BOULDER_LORE = "world/lore/boulder-woman.lore.ts"

const HALL_LORE = "world/lore/the-hall.lore.ts"

const PATHS: Record<string, string> = {
  "lore/grace": GRACE_LORE,
  "lore/echo": ECHO_LORE,
  "lore/the-hall": HALL_LORE,
}

const GRACE_PERSONA = "grace-persona"

const ECHO_PERSONA = "echo-persona"

const PERSONAS: Record<string, string> = { [GRACE]: GRACE_PERSONA, [ECHO]: ECHO_PERSONA }

function lookOver(withheld: readonly string[] = []): LoreLooking {
  return {
    pathOf: (page) => PATHS[page] ?? null,
    personaOf: (character) => PERSONAS[character] ?? null,
    about: [
      [GRACE_LORE, GRACE],
      [GRACE_PERSONA_LORE, GRACE_PERSONA],
      [ECHO_LORE, ECHO],
      [BOULDER_LORE, ECHO_PERSONA],
      [HALL_LORE, null],
    ],
    withheld,
  }
}

test("a turn at writer naming a new character's lore names that lore and no earlier turn's cast", () => {
  expect(loreNamed(["lore/grace"], [], lookOver())).toEqual([GRACE_LORE])
})

test("a turn naming a new character names the lore about that character and its persona, and not an earlier character's", () => {
  expect(loreNamed(["lore/grace"], [GRACE], lookOver())).toEqual([GRACE_PERSONA_LORE, GRACE_LORE])
})

test("lore a turn names that is about no character is named", () => {
  expect(loreNamed(["lore/the-hall"], [ECHO], lookOver())).toEqual([
    BOULDER_LORE,
    ECHO_LORE,
    HALL_LORE,
  ])
})

test("a turn naming no lore and no character names nothing", () => {
  expect(loreNamed([], [], lookOver())).toEqual([])
})

test("withheld lore is never named, whether the turn names it or it is about a character", () => {
  expect(loreNamed(["lore/grace"], [GRACE], lookOver([GRACE_LORE, GRACE_PERSONA_LORE]))).toEqual([])
})

test("a lore address naming no page is left out", () => {
  expect(loreNamed(["lore/nowhere"], [], lookOver())).toEqual([])
})
