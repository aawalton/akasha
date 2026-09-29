import { expect, test } from "bun:test"
import { overwhereIiiNala } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/characters/overwhere-iii-nala.character-player.ts"
import { settled } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-needs.world-check.settling.code.ts"

const NALA = `character-player/${overwhereIiiNala.slug}`

test("a fed, rested, warm Nala wants nothing", () => {
  expect(settled({ character: NALA, hoursFed: 2, hoursAwake: 4 })).toEqual({
    answered: { wants: [], penalty: 0 },
  })
})

test("eight hours unfed is hunger", () => {
  expect(settled({ character: NALA, hoursFed: 9, hoursAwake: 4 })).toEqual({
    answered: { wants: ["Hungry"], penalty: 1 },
  })
})

test("four miles barefoot on a cold night stacks two wants", () => {
  expect(
    settled({ character: NALA, hoursFed: 2, hoursAwake: 4, cold: "chilled", barefootMiles: 4 })
  ).toEqual({ answered: { wants: ["Chilled", "Sore Feet"], penalty: 2 } })
})

test("every want at its worst costs no more than four", () => {
  expect(
    settled({ character: NALA, hoursFed: 30, hoursAwake: 40, cold: "freezing", barefootMiles: 9 })
  ).toHaveProperty("answered.penalty", 4)
})

test("a cold the game does not have is refused", () => {
  expect(settled({ character: NALA, hoursFed: 1, hoursAwake: 1, cold: "arctic" })).toHaveProperty(
    "refused"
  )
})

test("a reading naming no character is refused", () => {
  expect(settled({ character: "", hoursFed: 1, hoursAwake: 1 })).toHaveProperty("refused")
})
