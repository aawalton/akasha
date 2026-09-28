import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-mana-flow.world-check.settling.code.ts"

const NALA = { character: "otherwhere-ix-nala", maxMana: 344, spirit: 16 }

test("an hour awake regains half her Spirit", () => {
  expect(settled({ ...NALA, mana: 300, hoursAwake: 1 })).toEqual({
    answered: { mana: 308, burned: 0, harm: 0 },
  })
})

test("sleep regains twice as fast", () => {
  expect(settled({ ...NALA, mana: 100, hoursAsleep: 8 })).toHaveProperty("answered.mana", 228)
})

test("spending takes from what she holds", () => {
  expect(settled({ ...NALA, mana: 344, spent: 50 })).toHaveProperty("answered.mana", 294)
})

test("mana never passes its most", () => {
  expect(settled({ ...NALA, mana: 340, hoursAsleep: 8 })).toHaveProperty("answered.mana", 344)
})

test("mana taken past her most burns off and harms her", () => {
  expect(settled({ ...NALA, mana: 300, taken: 100 })).toEqual({
    answered: { mana: 344, burned: 56, harm: 28 },
  })
})

test("spending more than she holds is refused", () => {
  expect(settled({ ...NALA, mana: 20, spent: 50 })).toHaveProperty("refused")
})
