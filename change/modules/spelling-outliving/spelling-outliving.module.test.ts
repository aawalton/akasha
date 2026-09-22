import { afterAll, expect, test } from "bun:test"
import { stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  carrying,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  AT_MOST,
  survivalSaid,
  survivedIn,
  survivedOver,
  survivingEachSaid,
  survivingSaid,
} from "akasha/change/modules/spelling-outliving/spelling-outliving.module.code.ts"
import {
  indexedRepo,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const WAS = "held-day"

const BARE = "akasha/one/bare.module.code.ts"

const LONGEST = "held-day-slug"

const LONGER = "akasha/one/longer.module.code.ts"

const SOWN = "akasha/one/sown.module.code.ts"

const KEPT = "akasha/one/bare.module.uncommitted.ts"

const HELD: Readonly<Record<string, string>> = {
  [BARE]: 'export const was = "held-day"\n',
  [LONGER]: 'export const was = "held-day-slug"\n',
  [SOWN]: 'export const was = "held-day"\n',
  [KEPT]: 'export const bareModuleUncommitted = { "was": "held-day" } as const\n',
}

const nothing = (): boolean => false

function worldHolding(): World {
  const root = indexedRepo(HELD)
  return worldAt(root, textIn(root))
}

function namedIn(said: ReturnType<typeof survivedIn>): readonly string[] {
  return said === null || "past" in said ? [] : said.named
}

test("a file spelling the old name whole is named", () => {
  expect(namedIn(survivedIn(worldHolding(), WAS, nothing))).toContain(BARE)
})

test("a longer name holding the old name is passed over", () => {
  expect(namedIn(survivedIn(worldHolding(), WAS, nothing))).not.toContain(LONGER)
})

test("a sidecar of uncommitted values is left out", () => {
  expect(namedIn(survivedIn(worldHolding(), WAS, nothing))).not.toContain(KEPT)
})

test("a file a generator writes is left out", () => {
  const said = survivedIn(worldHolding(), WAS, (path) => path === SOWN)

  expect(namedIn(said)).toEqual([BARE])
})

test("the body weighed is the body the change leaves rather than the body on disk", () => {
  const world = worldHolding()
  const spelled = stating(
    [BARE, SOWN].map((path) => ({
      kind: "replace" as const,
      path,
      contentFrom: '"held-day"',
      contentTo: '"day"',
    }))
  )

  expect(survivedIn(carrying(world, spelled), WAS, nothing)).toBeNull()
})

test("one search answers every name handed in", () => {
  const found = survivedOver(worldHolding(), [WAS, LONGEST], nothing)

  expect(namedIn(found.get(WAS) ?? null)).toEqual([BARE, SOWN])
  expect(namedIn(found.get(LONGEST) ?? null)).toEqual([LONGER])
})

test("every name handed in is said in the order it was handed in", () => {
  const lines = survivingEachSaid(worldHolding(), [LONGEST, WAS])

  expect(lines[0] ?? "").toContain(`\`${LONGEST}\``)
  expect(lines[1] ?? "").toContain(`\`${WAS}\``)
})

test("a name written nowhere is said nothing of", () => {
  expect(survivingSaid(worldHolding(), "no-such-name-here")).toEqual([])
})

test("how many files and which files are said in one line", () => {
  const said = survivedIn(worldHolding(), WAS, (path) => path === SOWN)
  const lines = survivalSaid(WAS, said)

  expect(lines).toHaveLength(1)
  expect(lines[0] ?? "").toContain("1 file")
  expect(lines[0] ?? "").toContain(BARE)
})

test("a name in more files than the ceiling is counted rather than named", () => {
  expect(survivalSaid(WAS, { past: AT_MOST })).toEqual([
    `\`${WAS}\` is written in more than ${String(AT_MOST)} files, too many to name`,
  ])
})

test("a tree that could not be searched names nothing rather than refusing", () => {
  expect(survivedIn({ ...worldHolding(), root: "/nowhere" }, WAS, nothing)).toBeNull()
})
