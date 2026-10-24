import { afterAll, expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { until } from "akasha/check/test/fixture/waiting/waiting.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { bunning } from "akasha/page/modules/uncommitted/page-uncommitted.module.test-fixtures.ts"
import { landedIn } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import {
  claimedAll,
  claimsGone,
  claimsIn,
  releasedAll,
} from "akasha/page/service/modules/write-claiming/write-claiming.module.code.ts"
import {
  KEY,
  racing,
  type Side,
} from "akasha/page/service/modules/write-claiming/write-claiming.module.test-fixtures.ts"

const PAGE = "agent/message/pages/message-0001.agent-message.ts"

const OTHER = "agent/message/pages/message-0002.agent-message.ts"

const WRITER = "Amy <amy@alanwalton.com>"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function holding(pages: readonly string[]): string {
  const root = scratch.rootFor("akasha-write-claiming-")
  for (const one of pages) {
    mkdirSync(dirname(join(root, one)), { recursive: true })
    writeFileSync(join(root, one), "export const held = {} as const\n")
  }
  return root
}

test("a claim names a page and a key, and anything else is refused", () => {
  expect(claimsIn([{ path: PAGE, key: KEY }])).toEqual([{ path: PAGE, key: KEY }])
  expect(claimsIn({ path: PAGE })).toBe("`claims` is a list")
  expect(typeof claimsIn([{ path: PAGE }])).toBe("string")
  expect(typeof claimsIn([{ path: PAGE, key: "" }])).toBe("string")
})

test("a page claimed once is refused a second claim, and keeps the first", () => {
  const root = holding([PAGE])
  expect(claimedAll(root, [{ path: PAGE, key: KEY }], "first")).toBeNull()
  expect(claimedAll(root, [{ path: PAGE, key: KEY }], "second")).toContain("claimed")
  expect(uncommittedIn(root, PAGE)?.[KEY]).toBe("first")
})

test("a page that is not there is refused its claim and keeps nothing", () => {
  const root = holding([])
  expect(claimedAll(root, [{ path: PAGE, key: KEY }], "first")).not.toBeNull()
  expect(uncommittedIn(root, PAGE)).toBeNull()
})

test("a claim refused releases the claims taken before it", () => {
  const root = holding([PAGE, OTHER])
  mergeUncommitted(root, OTHER, { [KEY]: "taken" })
  const claims = [
    { path: PAGE, key: KEY },
    { path: OTHER, key: KEY },
  ]
  expect(claimedAll(root, claims, "cancel")).not.toBeNull()
  expect(uncommittedIn(root, PAGE)).toEqual({})
  expect(uncommittedIn(root, OTHER)?.[KEY]).toBe("taken")
})

test("a claim released leaves the page claimable again", () => {
  const root = holding([PAGE])
  claimedAll(root, [{ path: PAGE, key: KEY }], "first")
  releasedAll(root, [{ path: PAGE, key: KEY }])
  expect(claimedAll(root, [{ path: PAGE, key: KEY }], "again")).toBeNull()
})

test("a claim on a page the write took away goes, and one on a page kept stays", () => {
  const root = holding([PAGE, OTHER])
  const claims = [
    { path: PAGE, key: KEY },
    { path: OTHER, key: KEY },
  ]
  claimedAll(root, claims, "cancel")
  claimsGone(root, claims, [PAGE])
  expect(uncommittedIn(root, PAGE)).toBeNull()
  expect(uncommittedIn(root, OTHER)?.[KEY]).toBe("cancel")
})

test("a write claiming a page claimed already lands nothing and is a race", async () => {
  const root = holding([PAGE])
  mergeUncommitted(root, PAGE, { [KEY]: "taken" })
  const said = await landedIn(root, [
    { writer: WRITER, message: "a message", read: "HEAD", claims: [{ path: PAGE, key: KEY }] },
  ])
  expect("refused" in said && said.fault).toBe("race")
  expect(existsSync(join(root, PAGE))).toBe(true)
})

test("a cancel racing a take over each of many messages leaves exactly one winner each", async () => {
  const pages = Array.from(
    { length: 24 },
    (_, at) => `agent/message/pages/m-${at}.agent-message.ts`
  )
  const root = holding(pages)
  const go = join(root, "go")
  const sides: readonly Side[] = ["cancel", "take"]
  const marks = sides.map((side) => ({
    side,
    ready: join(root, `ready-${side}`),
    go,
    said: join(root, `said-${side}`),
  }))
  const kids = marks.map((one) => bunning(racing(root, pages, one.side, one)))
  expect(await until(() => marks.every((one) => existsSync(one.ready)))).toBe(true)
  writeFileSync(go, "go")
  expect(await Promise.all(kids.map((one) => one.exited))).toEqual([0, 0])
  const won = marks.map((one) => JSON.parse(readFileSync(one.said, "utf8")) as boolean[])
  pages.forEach((page, at) => {
    const cancelled = won[0]?.[at] === true
    expect(cancelled).not.toBe(won[1]?.[at] === true)
    expect(uncommittedIn(root, page)?.[KEY]).toBe(cancelled ? "cancel" : "take")
  })
})
