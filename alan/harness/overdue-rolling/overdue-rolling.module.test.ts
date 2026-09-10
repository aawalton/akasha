import { expect, test } from "bun:test"
import { asPage, type Page, type PageWhere } from "@akasha/pages/core/page-types"
import {
  narrowFor,
  ROLLED,
  type Rolling,
  rolledOnto,
  rollingOnto,
  saidOf,
} from "./overdue-rolling.module.code.ts"

const DAY = "2026-09-06"

function rollingFor(pageTypeSlug: string): Rolling {
  const one = ROLLED.find((each) => each.pageTypeSlug === pageTypeSlug)
  if (one === undefined) throw new Error(`no rolling names \`${pageTypeSlug}\``)
  return one
}

function pageNamed(slug: string | null): Page {
  return asPage({ slug })
}

test("a to-do is narrowed by its due date and by carrying no completion", () => {
  expect(narrowFor(rollingFor("to-do"), DAY)).toEqual([
    { key: "toDoDueDate", lt: DAY },
    { key: "toDoCompletedAt", isEmpty: true },
  ])
})

test("no page type whose due date moves on completion alone is rolled here", () => {
  expect(ROLLED.map((one) => one.pageTypeSlug)).not.toContain("temper-task")
})

test("a roll sets the due date to the day it rolls onto", async () => {
  const asked: { readonly set: Readonly<Record<string, string>> }[] = []
  const rolled = await rolledOnto(rollingFor("to-do"), DAY, async (args) => {
    asked.push(args)
    return [pageNamed("shower"), pageNamed("pray")]
  })
  expect(asked[0]?.set).toEqual({ toDoDueDate: DAY })
  expect(rolled.slugs).toEqual(["shower", "pray"])
})

test("a page answering no slug is left out of what rolled", async () => {
  const rolled = await rolledOnto(rollingFor("to-do"), DAY, async () => [
    pageNamed(null),
    pageNamed("pray"),
  ])
  expect(rolled.slugs).toEqual(["pray"])
})

test("every page type is rolled in one run", async () => {
  const reached: string[] = []
  const rolled = await rollingOnto(DAY, async (args) => {
    reached.push(args.pageTypeSlug)
    return []
  })
  expect(reached).toEqual(["to-do"])
  expect(rolled.map((one) => one.pageTypeSlug)).toEqual(["to-do"])
})

test("what rolled is said as a count for each page type", () => {
  const said = saidOf([{ pageTypeSlug: "to-do", slugs: ["shower"] }], DAY)
  expect(said).toBe("1 of `to-do` now come due on 2026-09-06")
})

test("no two page types roll one key", () => {
  const keys = ROLLED.map((one) => one.dueKey)
  expect(new Set(keys).size).toBe(keys.length)
})

test("a where a roll builds is a where the page types take", () => {
  const built: PageWhere = narrowFor(rollingFor("to-do"), DAY)
  expect(built.length).toBe(2)
})
