import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameAttribute } from "akasha/story/game/attribute/game-attribute.page-type.ts"
import { finesse } from "akasha/story/game/attribute/pages/finesse.game-attribute.ts"
import { luck } from "akasha/story/game/attribute/pages/luck.game-attribute.ts"
import { might } from "akasha/story/game/attribute/pages/might.game-attribute.ts"
import { presence } from "akasha/story/game/attribute/pages/presence.game-attribute.ts"
import { will } from "akasha/story/game/attribute/pages/will.game-attribute.ts"
import { gameEntity } from "akasha/story/game/entity/game-entity.page-type.ts"
import {
  affinitiesIn,
  attributesIn,
  bondsIn,
  equipmentIn,
  joinedOf,
  markedIn,
  nowOf,
  saidIn,
  skillsIn,
} from "akasha/story/game/entity/modules/sheet-reading/sheet-reading.module.code.ts"

const LUCK = namedAs(gameAttribute.slug, luck.slug, null)
const MIGHT = namedAs(gameAttribute.slug, might.slug, null)
const FINESSE = namedAs(gameAttribute.slug, finesse.slug, null)
const WILL = namedAs(gameAttribute.slug, will.slug, null)
const PRESENCE = namedAs(gameAttribute.slug, presence.slug, null)
const ARIA = namedAs(gameEntity.slug, "harem-hotel-aria", null)

test("blank text is no text", () => {
  expect(saidIn("  a  ")).toBe("a")
  expect(saidIn("   ")).toBe(undefined)
  expect(saidIn(7)).toBe(undefined)
})

test("an attribute the sheet names in capitals reads as that attribute's page", () => {
  expect(attributesIn({ MIGHT: 14, LUCK: 9 })).toEqual([
    { attribute: LUCK, score: 9 },
    { attribute: MIGHT, score: 14 },
  ])
})

test("what is no number is no score", () => {
  expect(attributesIn({ MIGHT: "lots" })).toEqual([])
  expect(attributesIn("nothing")).toEqual([])
})

test("what is worn and what is carried come off as one list", () => {
  const found = equipmentIn({
    armor: { def: 5, name: "Scale", note: "heavy" },
    weapon: { atk: 7, name: "Chain Whip", scaling: "FINESSE" },
    items: [{ name: "rope" }],
  })
  expect(found).toHaveLength(3)
  expect(found[0]).toEqual({
    name: "Scale",
    slot: "armor",
    attack: undefined,
    defense: 5,
    scaling: undefined,
    note: "heavy",
  })
  expect(found[1]?.scaling).toBe(FINESSE)
  expect(found[2]?.slot).toBe(undefined)
})

test("a slot with no name is named for the slot", () => {
  expect(equipmentIn({ armor: { def: 5 } })[0]?.name).toBe("armor")
})

test("a field no property holds is folded into one note", () => {
  expect(joinedOf({ note: "sharp", affinity: "ember" }, ["note", "affinity"])).toBe("sharp — ember")
  expect(joinedOf({}, ["note"])).toBe(undefined)
})

test("a skill holds how far it has come rather than the rung that reaches", () => {
  const found = skillsIn([
    {
      name: "Read the Room",
      rung: "Apprentice",
      rungBand: "6-15",
      displayed: 9,
      effect: "sees it",
    },
  ])
  expect(found).toEqual([{ name: "Read the Room", progress: 9, effect: "sees it" }])
})

test("what a game master appended turn by turn is history, and comes off", () => {
  expect(nowOf("a clean bind | TURN 65: PROMOTED | TURN 80: again")).toBe("a clean bind")
  expect(nowOf("a clean bind")).toBe("a clean bind")
  expect(nowOf(undefined)).toBe(undefined)
})

test("an affinity holds its tier in the words the ladder uses", () => {
  const found = affinitiesIn([
    { name: "Ember", type: "Ember / Heat", tier: "Manipulation", counter: 7, cap: 50 },
  ])
  expect(found[0]?.tier).toBe("manipulation")
  expect(found[0]?.counter).toBe(7)
})

test("a trait says what it does, and says so when it says nothing", () => {
  expect(markedIn([{ name: "Steady" }])).toEqual([{ name: "Steady", effect: "none stated" }])
})

test("a listed thing with no name is called by the name it is filed under", () => {
  expect(markedIn([{ id: "ember-wave" }])[0]?.name).toBe("ember-wave")
  expect(skillsIn([{ id: "ember-siphon", displayed: 3 }])[0]?.name).toBe("ember-siphon")
  expect(markedIn([{}])[0]?.name).toBe("unnamed")
})

test("a bond names the other one's page and the attribute it couples on each side", () => {
  const found = bondsIn(
    [
      {
        name: "The Link",
        entity: "aria",
        direction: "inbound",
        trait: "WILL",
        boundTrait: "PRESENCE",
        grows: true,
        establishedTurn: 12,
      },
    ],
    "harem-hotel"
  )
  expect(found[0]?.entity).toBe(ARIA)
  expect(found[0]?.attribute).toBe(WILL)
  expect(found[0]?.boundAttribute).toBe(PRESENCE)
  expect(found[0]?.grows).toBe(true)
})

test("a bond naming nobody is no bond", () => {
  expect(bondsIn([{ name: "nothing" }], "harem-hotel")).toEqual([])
})
