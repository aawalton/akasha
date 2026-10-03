import { expect, test } from "bun:test"
import {
  characterRefused,
  meantBy,
} from "akasha/command/pages/story/settle/modules/settle-character/settle-character.module.code.ts"
import type {
  Admitted,
  Character,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"

const NALA = "character-player/the-saga-nala"

const ILSA = "character-other/the-saga-ilsa-crane"

const OLD_ILSA = "character-other/the-saga-old-ilsa"

const CAST: readonly Character[] = [
  { address: NALA, title: "Nala", aliasOf: null },
  { address: ILSA, title: "Ilsa Crane", aliasOf: null },
  { address: OLD_ILSA, title: "Old Ilsa", aliasOf: ILSA },
]

const TOWN = "place/the-saga-wendle-ford"

const WENNA = "world-character/the-saga-wenna-ashlar"

const FILED = new Set([
  NALA,
  ILSA,
  OLD_ILSA,
  TOWN,
  WENNA,
  "world-relationship/the-saga-nala",
  "world-relationship/the-saga-wenna-ashlar",
])

const ADMITTED: Admitted = {
  types: ["character-other", "character-player", "world-character"],
  filed: (address) => FILED.has(address),
}

const CASTING = {
  admitted: () => ADMITTED,
  cast: () => CAST,
  slugged: (slug: string) =>
    ADMITTED.types.map((type) => `${type}/${slug}`).filter((one) => FILED.has(one)),
}

function refusedFor(character: unknown): string | null {
  return characterRefused({ character, gains: [] }, CASTING)
}

test("a character named by the address of a character's page is taken", () => {
  expect(refusedFor(NALA)).toBeNull()
  expect(refusedFor(ILSA)).toBeNull()
})

test("a reading naming no character is not judged", () => {
  const unread = (): never => {
    throw new Error("a reading naming no character reads no index")
  }
  const casting = { admitted: unread, cast: unread, slugged: unread }
  expect(characterRefused({ minutes: 30 }, casting)).toBeNull()
})

test("a world's character outside the story's cast is taken by its page's address", () => {
  expect(refusedFor(WENNA)).toBeNull()
})

test("a slug the cast lacks is pointed at the world's character page holding it", () => {
  expect(refusedFor("the-saga-wenna-ashlar")).toContain(`say \`${WENNA}\``)
})

test("a relationship page whose character is the world's is pointed at that page", () => {
  const refused = refusedFor("world-relationship/the-saga-wenna-ashlar") ?? ""
  expect(refused).toContain("beside a character")
  expect(refused).toContain(`say \`${WENNA}\``)
})

test("a place a check scores as a character is taken by its page's address", () => {
  expect(refusedFor(TOWN)).toBeNull()
})

test("a bare name is refused, naming the page of the character it matches", () => {
  const refused = refusedFor("nala") ?? ""
  expect(refused).toContain("`nala` names no page")
  expect(refused).toContain(`say \`${NALA}\``)
})

test("a slug without its page type is refused, naming its page", () => {
  expect(refusedFor("the-saga-nala")).toContain(`say \`${NALA}\``)
})

test("a title is refused, naming the page of the character so titled", () => {
  expect(refusedFor("Ilsa Crane")).toContain(`say \`${ILSA}\``)
})

test("a page beside a character, sharing its slug, is refused for the character's own", () => {
  const refused = refusedFor("world-relationship/the-saga-nala") ?? ""
  expect(refused).toContain("beside a character")
  expect(refused).toContain(`say \`${NALA}\``)
})

test("an address naming no page is refused", () => {
  expect(refusedFor("character-player/nala")).toContain(`say \`${NALA}\``)
})

test("a name matching no character says no character is named so", () => {
  expect(refusedFor("Brenna")).toContain("no character of this story is named so")
})

test("a character named by something other than text is refused", () => {
  expect(refusedFor(7)).toContain("no text")
})

test("an alias is refused, naming the page it is an alias of", () => {
  const refused = refusedFor(OLD_ILSA) ?? ""
  expect(refused).toContain("alias")
  expect(refused).toContain(`say \`${ILSA}\``)
})

test("a name matching an alias is pointed at the page the alias is of", () => {
  expect(meantBy("ilsa", CAST)).toEqual([ILSA])
})
