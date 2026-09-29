import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-notice.world-check.settling.code.ts"

const NALA = "her"

test("a prayer with an offering moves a god two", () => {
  expect(
    settled({
      character: NALA,
      gods: [{ god: "sardanal", value: 0, deeds: [{ kind: "prayer" }, { kind: "offering" }] }],
    })
  ).toEqual({ answered: { noticed: [{ god: "sardanal", from: 0, to: 2, reached: [] }] } })
})

test("a deed in a god's own domain can carry it past a mark", () => {
  expect(
    settled({
      character: NALA,
      gods: [{ god: "maradoc", value: 48, deeds: [{ kind: "domain-deed", by: 3 }] }],
    })
  ).toEqual({ answered: { noticed: [{ god: "maradoc", from: 48, to: 51, reached: [50] }] } })
})

test("a broken oath costs ten and never goes below nought", () => {
  expect(
    settled({
      character: NALA,
      gods: [{ god: "enttiku", value: 4, deeds: [{ kind: "oath-broken" }] }],
    })
  ).toHaveProperty("answered.noticed.0.to", 0)
})

test("a domain deed above three is refused", () => {
  expect(
    settled({
      character: NALA,
      gods: [{ god: "neriad", value: 0, deeds: [{ kind: "domain-deed", by: 5 }] }],
    })
  ).toHaveProperty("refused")
})

test("a god with no deed is refused", () => {
  expect(
    settled({ character: NALA, gods: [{ god: "neriad", value: 0, deeds: [] }] })
  ).toHaveProperty("refused")
})
