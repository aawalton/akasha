import { expect, test } from "bun:test"
import { innworldCharacters as CHARACTERS } from "akasha/page/nav/pages/innworld-characters.nav.ts"
import { innworldHome as HOME } from "akasha/page/nav/pages/innworld-home.nav.ts"
import { innworldMiracles as MIRACLES } from "akasha/page/nav/pages/innworld-miracles.nav.ts"
import { innworldPowers as POWERS } from "akasha/page/nav/pages/innworld-powers.nav.ts"
import { innworldSongs as SONGS } from "akasha/page/nav/pages/innworld-songs.nav.ts"
import { innworldSpells as SPELLS } from "akasha/page/nav/pages/innworld-spells.nav.ts"
import { shelvesOf } from "akasha/product/wandering-inn-wiki/web/modules/innworld-shelves/innworld-shelves.module.code.ts"

const EMPTY = {
  slug: "innworld-empty",
  title: "Empty",
  icon: "box",
  navPlace: 9,
  bottomSection: true,
}

const TYPES = [
  { slug: "world-character", definition: "a person in the story" },
  { slug: "world-song", definition: null },
]

test("the loose items come first in their places, and Home is left off", () => {
  const [loose] = shelvesOf([SPELLS, HOME, CHARACTERS], TYPES)
  expect(loose?.heading).toBeNull()
  expect(loose?.under.map((one) => one.label)).toEqual(["Characters", "Spells"])
})

test("each section is a shelf holding the items under it in their places", () => {
  const shelves = shelvesOf([SONGS, POWERS, MIRACLES, CHARACTERS], TYPES)
  expect(shelves.map((shelf) => shelf.heading)).toEqual([null, "Powers"])
  expect(shelves[1]?.under.map((one) => one.href)).toEqual(["/world-miracle", "/world-song"])
})

test("an entry carries its icon and the definition of the type its link reaches", () => {
  const [loose] = shelvesOf([CHARACTERS, SPELLS], TYPES)
  expect(loose?.under[0]).toEqual({
    href: "/world-character",
    label: "Characters",
    icon: "users",
    definition: "a person in the story",
  })
  expect(loose?.under[1]?.definition).toBeNull()
})

test("a section holding nothing sets out no shelf", () => {
  expect(shelvesOf([EMPTY, CHARACTERS], TYPES).map((shelf) => shelf.heading)).toEqual([null])
})
