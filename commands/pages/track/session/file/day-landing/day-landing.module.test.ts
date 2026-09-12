import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  besideArgv,
  pathUnder,
  withSessionsDeclared,
} from "akasha/commands/pages/track/session/file/day-landing/day-landing.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const ROOT = "/var/home/walton/repos/akasha"

const UNDECLARED = `import type { Day } from "../../day.page-type.ts"

export const day19990102 = {
  id: "01a07629-2c15-7000-aa49-25832a4c3322",
  pageTypeSlug: "day",
  slug: "day-1999-01-02",
  date: "1999-01-02",
} as const satisfies Day
`

const DECLARED = withSessionsDeclared(UNDECLARED)

function heldFor(
  day: string,
  said: string
): {
  day: string
  path: string
  page: string
  pageAt: string
  pageSaid: string
  rows: never[]
} {
  const at = `${ROOT}/alan/track/daily/days/pages/${day}`
  return {
    day,
    path: `${at}/day-${day}.day.sessions.jsonl`,
    page: "01a07629-2c15-7000-aa49-25832a4c3322",
    pageAt: `${at}/day-${day}.day.ts`,
    pageSaid: said,
    rows: [],
  }
}

test("a day page carrying no declaration gains one before its closing line", () => {
  expect(DECLARED).toContain('  sessions: "jsonl",\n} as const satisfies Day')
  expect(DECLARED.replace('  sessions: "jsonl",\n', "")).toBe(UNDECLARED)
})

test("a day page already declaring the stretches is handed back unchanged", () => {
  expect(withSessionsDeclared(DECLARED)).toBe(DECLARED)
})

test("a body carrying no closing line is handed back unchanged", () => {
  expect(withSessionsDeclared("nothing closes here\n")).toBe("nothing closes here\n")
})

test("a path under the root is spelled against the root", () => {
  expect(pathUnder(ROOT, `${ROOT}/alan/track/daily`)).toBe("alan/track/daily")
})

test("a path outside the root is spelled whole", () => {
  expect(pathUnder(ROOT, "/elsewhere/entirely")).toBe("/elsewhere/entirely")
})

test("the one day of a landing has its page written and its rows left to the body", () => {
  const scratch = mkdtempSync(join(SCRATCH_AT, "amy-day-landing-"))
  try {
    const argv = besideArgv([{ held: heldFor("1999-01-02", UNDECLARED), rows: [] }], scratch, ROOT)
    expect(argv).toEqual([
      "--file-path",
      "alan/track/daily/days/pages/1999-01-02/day-1999-01-02.day.ts",
      "--content-file",
      join(scratch, "page-0"),
    ])
    expect(readFileSync(join(scratch, "page-0"), "utf8")).toBe(DECLARED)
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
})

test("a day already declaring the stretches has nothing written for it", () => {
  const scratch = mkdtempSync(join(SCRATCH_AT, "amy-day-landing-"))
  try {
    const argv = besideArgv([{ held: heldFor("1999-01-02", DECLARED), rows: [] }], scratch, ROOT)
    expect(argv).toEqual([])
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
})

test("the rows of every day but the last are written beside the days those rows are of", () => {
  const scratch = mkdtempSync(join(SCRATCH_AT, "amy-day-landing-"))
  try {
    const argv = besideArgv(
      [
        { held: heldFor("1999-01-01", DECLARED), rows: [] },
        { held: heldFor("1999-01-02", DECLARED), rows: [] },
      ],
      scratch,
      ROOT
    )
    expect(argv).toEqual([
      "--file-path",
      "alan/track/daily/days/pages/1999-01-01/day-1999-01-01.day.sessions.jsonl",
      "--content-file",
      join(scratch, "day-0"),
    ])
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
})
