import { expect, test } from "bun:test"
import {
  bodyTelling,
  GAME_MASTER,
  knowersFor,
  taken,
  toldIn,
} from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"

const CALLED = "akasha story tell"

const HER = `${characterOther.slug}/grove-keeper`

const PAGE = `${lore.slug}/grove`

const BODY = [
  'import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"',
  "",
  "export const grove = {",
  '  id: "01a0d600-0000-7000-8000-000000000009",',
  '  type: "page-type/lore",',
  '  slug: "grove",',
  '  title: "Grove",',
  '  world: "world/held",',
  `  about: "${HER}",`,
  '  secrets: "jsonl",',
  "} as const satisfies Lore",
  "",
].join("\n")

test("a call names the page, the fact and each knower", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains.", "--knower", HER], CALLED)
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [HER] })
})

test("a call naming no knower tells the game master alone", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains."], CALLED)
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [] })
  expect(knowersFor([])).toEqual([GAME_MASTER])
})

test("the game master is a knower whenever a character is", () => {
  expect(knowersFor([HER])).toEqual([GAME_MASTER, HER])
  expect(knowersFor([HER, GAME_MASTER, HER])).toEqual([GAME_MASTER, HER])
})

test("a secret told leaves the secrets for the facts, with the game master", () => {
  const now = toldIn({ told: [], secrets: ["one", "two"] }, "two", [HER])
  expect(now).toEqual({ told: [{ fact: "two", knowers: [GAME_MASTER, HER] }], secrets: ["one"] })
})

test("a fact already told gains the knowers it lacks and loses none", () => {
  const was = { told: [{ fact: "one", knowers: [GAME_MASTER] }], secrets: [] }
  expect(toldIn(was, "one", [HER])).toEqual({
    told: [{ fact: "one", knowers: [GAME_MASTER, HER] }],
    secrets: [],
  })
  expect(typeof toldIn(was, "one", [])).toBe("string")
})

test("a fact the page does not hold is refused", () => {
  expect(typeof toldIn({ told: [], secrets: ["one"] }, "none", [])).toBe("string")
})

test("the page's last secret told takes its secrets key away and states its facts", () => {
  const body = bodyTelling("grove.lore.ts", BODY, {
    told: [{ fact: "two", knowers: [GAME_MASTER] }],
    secrets: [],
  })
  expect(body).not.toContain("secrets:")
  expect(body).toContain(`facts: [{ fact: "two", knowers: ["${GAME_MASTER}"] }]`)
})

test("a page keeping secrets keeps its secrets key", () => {
  const body = bodyTelling("grove.lore.ts", BODY, {
    told: [{ fact: "two", knowers: [GAME_MASTER] }],
    secrets: ["one"],
  })
  expect(body).toContain('secrets: "jsonl"')
})
