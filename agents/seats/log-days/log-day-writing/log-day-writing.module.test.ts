import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  appenderOver,
  boundFaultIn,
  dayNameOf,
} from "akasha/agents/seats/log-days/log-day-writing/log-day-writing.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SOURCE = "oauth-proxy-console"

const SEAT = "athena"

const DATE = "2026-09-12"

test("a day's slug joins its source to its seat to its date", () => {
  expect(dayNameOf(SOURCE, SEAT, DATE)).toBe("oauth-proxy-console-athena-2026-09-12")
})

test("a source, a seat and a date that name an export are written", () => {
  expect(boundFaultIn(SOURCE, SEAT, DATE)).toBeNull()
  expect(boundFaultIn(SOURCE, "123", DATE)).toBeNull()
})

test("a line carrying no date names no export, so no line is written", () => {
  const said = boundFaultIn(SOURCE, SEAT, "")

  expect(said).toContain("oauthProxyConsoleAthena-")
  expect(said).toContain("no `export const` may be declared under")
  expect(said).toContain("so no line is written")
})

test("a date carrying a quote names no export, so no line is written", () => {
  expect(boundFaultIn(SOURCE, SEAT, '2026"09')).toContain("no `export const` may be declared under")
})

test("a seat name carrying a dot or a slash or a space names no export", () => {
  expect(boundFaultIn(SOURCE, "a.b", DATE)).not.toBeNull()
  expect(boundFaultIn(SOURCE, "a/b", DATE)).not.toBeNull()
  expect(boundFaultIn(SOURCE, "a b", DATE)).not.toBeNull()
})

test("a source naming no export is refused though its day names one", () => {
  expect(boundFaultIn("a/b", SEAT, DATE)).not.toBeNull()
})

const SLUG = dayNameOf(SOURCE, SEAT, DATE)

const PAGE = `${SLUG}.seat-log-day.ts`

const LINES = `${SLUG}.seat-log-day.lines.uncommitted.jsonl`

function dayUp(root: string, under: string): string {
  mkdirSync(join(root, under, SLUG), { recursive: true })
  writeFileSync(join(root, under, SLUG, PAGE), "export const held = {}\n")
  writeFileSync(join(root, under, SLUG, LINES), '{"written-at":"seed"}\n')
  return `${under}/${SLUG}/${PAGE}`
}

function linesIn(root: string, under: string): string {
  return readFileSync(join(root, under, SLUG, LINES), "utf8")
}

test("a line written after its page moved goes beside that page where the page now is", async () => {
  const root = scratch.rootFor("akasha-log-day-writing-moved-")
  let at = dayUp(root, "was")
  const next = dayUp(root, "now")
  const said = appenderOver(
    root,
    SLUG,
    null,
    () => at,
    async () => null
  )

  said.append({ "written-at": `${DATE}T00:00:00Z`, text: "before the move" })
  await said.flushed()
  expect(linesIn(root, "was")).toContain("before the move")

  rmSync(join(root, "was", SLUG, PAGE))
  at = next
  said.append({ "written-at": `${DATE}T00:00:01Z`, text: "after the move" })
  await said.flushed()

  expect(said.refused()).toBeNull()
  expect(linesIn(root, "now")).toContain("after the move")
  expect(linesIn(root, "was")).not.toContain("after the move")
})

test("a writer refused by a folder that went writes again once its page moves", async () => {
  const root = scratch.rootFor("akasha-log-day-writing-refused-")
  let at = dayUp(root, "was")
  const next = dayUp(root, "now")
  const said = appenderOver(
    root,
    SLUG,
    null,
    () => at,
    async () => null
  )

  said.append({ "written-at": `${DATE}T00:00:00Z`, text: "before the folder went" })
  await said.flushed()
  expect(linesIn(root, "was")).toContain("before the folder went")

  rmSync(join(root, "was", SLUG), { recursive: true })
  said.append({ "written-at": `${DATE}T00:00:01Z`, text: "into the folder that went" })
  await said.flushed()
  expect(said.refused()).not.toBeNull()

  at = next
  said.append({ "written-at": `${DATE}T00:00:02Z`, text: "after the move" })
  await said.flushed()

  expect(said.refused()).toBeNull()
  expect(linesIn(root, "now")).toContain("after the move")
})

test("a writer bound by a day naming no export stays refused though its page moves", async () => {
  const root = scratch.rootFor("akasha-log-day-writing-bound-")
  let at = dayUp(root, "was")
  const next = dayUp(root, "now")
  const bound = "a day naming no export, so no line is written"
  const said = appenderOver(
    root,
    SLUG,
    bound,
    () => at,
    async () => null
  )

  rmSync(join(root, "was", SLUG, PAGE))
  at = next
  said.append({ "written-at": `${DATE}T00:00:00Z`, text: "never written" })
  await said.flushed()

  expect(said.refused()).toBe(bound)
  expect(linesIn(root, "now")).not.toContain("never written")
})

test("a writer whose first part could not be named stays refused though its page moves", async () => {
  const root = scratch.rootFor("akasha-log-day-writing-partless-")
  const next = dayUp(root, "now")
  let at = "was/naming-no-page"
  const said = appenderOver(
    root,
    SLUG,
    null,
    () => at,
    async () => null
  )

  expect(said.refused()).toContain("no part could be named beside")

  at = next
  said.append({ "written-at": `${DATE}T00:00:00Z`, text: "never written" })
  await said.flushed()

  expect(said.refused()).toContain("no part could be named beside")
  expect(linesIn(root, "now")).not.toContain("never written")
})
