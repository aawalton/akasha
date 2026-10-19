import { expect, test } from "bun:test"
import { comparedLines } from "akasha/command/pages/temper/tps/modules/game-reading-comparing/game-reading-comparing.module.code.ts"
import { rotationReading } from "akasha/temper/player/character/stat/modules/rotation-reading/rotation-reading.module.code.ts"

const READING = rotationReading(
  [
    {
      skills: [],
      classPassives: [],
      enchants: [],
      weaponStyle: "one-hand",
      weaponStats: { magickaMaximum: 0, staminaMaximum: 20000, powerWeapon: 4000, powerSpell: 0 },
      multipliers: undefined,
    },
  ],
  0
)

const MULTIPLIERS = {
  healthMaximum: 40000,
  armorShare: 0.4,
  damageTaken: -0.1,
  healing: 1.2,
  damage: 1.3,
}

const GAME = {
  capturedAt: 1,
  toughness: READING.toughnessPerSecond,
  damage: READING.damagePerSecond * 2,
  healing: READING.healingPerSecond,
  reavingBlowsShare: 0,
  bars: [{ bar: "frontBar" as const, weaponStyle: "one-hand", ...MULTIPLIERS, damageTaken: 0 }],
}

test("no reading from the game says how to take one", () => {
  expect(comparedLines([], READING, undefined)[1]).toContain("opening the character sheet")
})

test("a figure the game and the catalog give alike is unmarked, and one they part on is marked", () => {
  const lines = comparedLines([], READING, GAME)
  expect(lines.find((line) => line.includes("toughness"))).not.toContain("differs")
  expect(lines.find((line) => line.includes("damage: catalog"))).toContain("differs")
})

test("each bar's multipliers are set side by side, and a bar the game kept nothing for says so", () => {
  const lines = comparedLines(
    [
      { bar: "frontBar", weaponStyle: "one-hand", multipliers: MULTIPLIERS },
      { bar: "backBar", weaponStyle: "one-hand", multipliers: MULTIPLIERS },
    ],
    READING,
    GAME
  )
  expect(lines.find((line) => line.includes("damageTaken"))).toContain("differs")
  expect(lines.find((line) => line.includes("healthMaximum"))).not.toContain("differs")
  expect(lines).toContain("    the add-on kept no multipliers for this bar")
})
