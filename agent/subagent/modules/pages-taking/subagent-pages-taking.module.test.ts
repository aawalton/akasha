import { expect, test } from "bun:test"
import { existsSync, rmSync } from "node:fs"
import { join } from "node:path"
import { slugOf } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import {
  notWorking,
  type Sending,
  tookUnder,
  WRITER,
} from "akasha/agent/subagent/modules/pages-taking/subagent-pages-taking.module.code.ts"
import {
  AGENT,
  keptBySeat,
  OWN,
  pageWritten,
  RETURNED,
  ROW,
  UNREAD,
  underSeat,
  WENT,
  WORKING,
} from "akasha/agent/subagent/modules/presence/subagent-presence.module.test-fixtures.ts"
import {
  CARRIED_AT,
  LEFT_BY,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { editsAt } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { refusalIn } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { z } from "zod"

const KEPT_ROW = z.looseObject({
  [LEFT_BY]: z.string(),
  [CARRIED_AT]: z.string(),
  kind: z.string(),
  path: z.string(),
})

function pagesTaking(root: string, asked: Writing[]): Sending {
  return (one) => {
    asked.push(one)
    for (const at of one.removes ?? []) rmSync(join(root, at), { force: true })
    return Promise.resolve({ commit: null, wrote: [], took: [...(one.removes ?? [])] })
  }
}

const READ_AT = "a".repeat(40)

const heading = (): string => READ_AT

function pagesRefusing(why: string): Sending {
  return () => Promise.resolve({ refused: why })
}

test("the writer a sweep names is a name and an address, as a write is held to", () => {
  expect(refusalIn({ writer: WRITER, message: "a sweep", removes: ["a.ts"] })).toBe(null)
})

test("a sweep takes a page with edits waiting, moving them onto the seat", async () => {
  await underSeat(async (root) => {
    const at = await pageWritten(root)
    writing(root, editsAt(at) ?? "", ROW)
    listedFiled(root, "subagent", slugOf("akasha", OWN), [{ path: at, id: AGENT }])
    const asked: Writing[] = []
    const sending = pagesTaking(root, asked)
    expect(await tookUnder(root, "akasha", "is gone", [], sending, RETURNED, heading)).toEqual(WENT)
    expect(asked.length).toBe(1)
    expect(asked[0]?.writer).toBe(WRITER)
    expect(asked[0]?.removes).toEqual([at])
    expect(asked[0]?.read).toBe(READ_AT)
    expect(asked[0]?.message).toContain("akasha is gone")
    expect(existsSync(join(root, at))).toBe(false)
    const row = KEPT_ROW.parse(JSON.parse(keptBySeat(root).edits))
    expect(row[LEFT_BY]).toBe(slugOf("akasha", OWN))
    expect(typeof row[CARRIED_AT]).toBe("string")
    expect(JSON.stringify({ kind: row.kind, path: row.path })).toBe(ROW.trim())
  })
})

test("a sweep the pages refused leaves every page where that page is", async () => {
  await underSeat(async (root) => {
    const at = await pageWritten(root)
    listedFiled(root, "subagent", slugOf("akasha", OWN), [{ path: at, id: AGENT }])
    const went = await tookUnder(
      root,
      "akasha",
      "is gone",
      [],
      pagesRefusing("the pages answered 500"),
      RETURNED,
      heading
    )
    expect("why" in went ? went.why : "").toContain("the pages answered 500")
    expect(existsSync(join(root, at))).toBe(true)
  })
})

test("a sweep leaves what a reading names as working and takes what it could not read", async () => {
  expect(await notWorking(".", ["one", "two"], WORKING)).toEqual([])
  expect(await notWorking(".", ["one", "two"], UNREAD)).toEqual(["one", "two"])
  expect(await notWorking(".", ["one", "two"], RETURNED)).toEqual(["one", "two"])
})
