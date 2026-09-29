import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-mana-flow.world-check.settling.code.ts"

const AT = {
  character: "her",
  mana: 12,
  attunement: 3.5,
  focus: 17,
  castings: [{ size: "small", runes: 1 }],
}

test("a small one-rune spell costs three and is an easy act", () => {
  expect(settled(AT)).toEqual({
    answered: { casts: [{ cost: 3, force: "light", band: "easy" }], manaLeft: 9 },
  })
})

test("working her own leaning color costs a quarter less", () => {
  expect(
    settled({ ...AT, castings: [{ size: "moderate", runes: 1, leaning: "aspected" }] })
  ).toHaveProperty("answered.casts.0.cost", 6)
})

test("colorless work costs half again", () => {
  expect(
    settled({ ...AT, castings: [{ size: "moderate", runes: 1, leaning: "colorless" }] })
  ).toHaveProperty("answered.casts.0.cost", 12)
})

test("each rune past the first costs two more and makes the act harder", () => {
  expect(settled({ ...AT, focus: 20, castings: [{ size: "small", runes: 2 }] })).toEqual({
    answered: { casts: [{ cost: 5, force: "light", band: "standard" }], manaLeft: 7 },
  })
})

test("castings in one turn draw from the same mana in order", () => {
  expect(
    settled({
      ...AT,
      castings: [
        { size: "small", runes: 1 },
        { size: "small", runes: 1 },
      ],
    })
  ).toHaveProperty("answered.manaLeft", 6)
})

test("below three percent attunement no one casts", () => {
  expect(settled({ ...AT, attunement: 0.1 })).toHaveProperty("refused")
})

test("a Focus under 20 holds only one rune", () => {
  expect(settled({ ...AT, castings: [{ size: "small", runes: 2 }] })).toHaveProperty("refused")
})

test("a casting she cannot pay for is refused", () => {
  expect(settled({ ...AT, castings: [{ size: "large", runes: 1 }] })).toHaveProperty("refused")
})
