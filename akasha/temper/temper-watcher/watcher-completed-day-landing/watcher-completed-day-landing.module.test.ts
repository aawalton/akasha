import { expect, test } from "bun:test"
import type { LandingDeps } from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  clearLandedCompletion,
  completedDayBody,
  completedDayLinesPath,
  completedDayOf,
  completedDayPagePath,
  completionCommitMessage,
  completionLine,
  completionsWith,
  completionsWithout,
  landCompletion,
} from "./watcher-completed-day-landing.module.code.ts"

const PAGE_PATH =
  "akasha/temper/temper-progress/completed-days/pages/day-2026-03-05/day-2026-03-05.temper-completed-day.ts"

const LINES_PATH =
  "akasha/temper/temper-progress/completed-days/pages/day-2026-03-05/day-2026-03-05.temper-completed-day.completions.jsonl"

const FIRST = {
  id: "019db533-f3b3-77f9-b1f7-7976a7b6f551",
  completedAt: "2026-03-05T12:48:43.137Z",
  title: "Dev Tracker",
  dueDate: "2026-03-05",
}

const LATER = {
  id: "019db533-f3b3-77f4-b9f5-55b617d9081e",
  completedAt: "2026-03-05T12:48:56.140Z",
  title: "Dev Tracker",
  dueDate: "2026-03-06",
}

type Body = { readonly path: string; readonly content: string | null }

function store(
  bodies: readonly Body[],
  answers: readonly ({ ok: true; at: string } | { ok: false; why: string })[]
): { deps: LandingDeps; wrote: unknown[] } {
  const wrote: unknown[] = []
  let at = 0
  const deps: LandingDeps = {
    waiting: async () => undefined,
    read: (async (paths: readonly string[]) => ({
      ok: true,
      at: "read-commit",
      bodies: paths.map((path) => ({
        path,
        content: bodies.find((one) => one.path === path)?.content ?? null,
      })),
      unplaced: [],
    })) as LandingDeps["read"],
    write: (async (
      given: unknown,
      writer: string,
      message: string,
      _fetcher: unknown,
      _rest: unknown,
      read: string | null
    ) => {
      wrote.push({ given, writer, message, read })
      const answer = answers[at] ?? { ok: false, why: "no answer was set up" }
      at++
      return answer
    }) as LandingDeps["write"],
  }
  return { deps, wrote }
}

test("the day a completion falls on is the UTC calendar day of the instant", () => {
  expect(completedDayOf("2026-03-05T12:48:43.137Z")).toBe("2026-03-05")
  expect(completedDayOf("2026-04-30T01:57:12.000Z")).toBe("2026-04-30")
})

test("a day names the page and the lines beside it", () => {
  expect(completedDayPagePath("2026-03-05")).toBe(PAGE_PATH)
  expect(completedDayLinesPath("2026-03-05")).toBe(LINES_PATH)
})

test("a completion line is the landed line, key for key", () => {
  expect(
    completionLine({
      id: "019db533-f3b3-77e0-bac5-71806d6387b1",
      completedAt: "2026-03-05T13:57:43.192Z",
      task: "hireling-mails",
      title: "Hireling Mails",
      character: "erin-solstice",
      esoCharacterId: "8796093022338107",
    })
  ).toBe(
    '{"id":"019db533-f3b3-77e0-bac5-71806d6387b1","completedAt":"2026-03-05T13:57:43.192Z","task":"hireling-mails","character":"erin-solstice","esoCharacterId":"8796093022338107"}'
  )
})

test("a completion line states the title only where it names no task", () => {
  expect(
    completionLine({
      id: "019db533-f3b3-77f4-b9f5-55b617d9081e",
      completedAt: "2026-03-05T12:48:56.140Z",
      title: "Dev Tracker",
      dueDate: "2026-03-05",
    })
  ).toBe(
    '{"id":"019db533-f3b3-77f4-b9f5-55b617d9081e","completedAt":"2026-03-05T12:48:56.140Z","title":"Dev Tracker","dueDate":"2026-03-05"}'
  )
})

test("a completion line writes an item path as text, as the property holding it is text", () => {
  expect(
    completionLine({
      id: "019de377-7289-708c-93c0-4a546d8bfd0b",
      completedAt: "2026-05-01T12:13:06.000Z",
      task: "undaunted-skill-line",
      character: "mrsha-du-marquin",
      dueDate: "2026-05-01",
      completionCardId: "skill-lines",
      completionItemPath: [55],
    })
  ).toBe(
    '{"id":"019de377-7289-708c-93c0-4a546d8bfd0b","completedAt":"2026-05-01T12:13:06.000Z","task":"undaunted-skill-line","character":"mrsha-du-marquin","dueDate":"2026-05-01","completionCardId":"skill-lines","completionItemPath":["55"]}'
  )
})

test("a completion line leaves out every empty text and an item path holding nothing", () => {
  expect(
    completionLine({
      id: "i",
      completedAt: "2026-03-05T12:48:43.137Z",
      task: "",
      title: "",
      character: "",
      esoCharacterId: "",
      dueDate: "",
      completionCardId: "",
      completionItemPath: [],
    })
  ).toBe('{"id":"i","completedAt":"2026-03-05T12:48:43.137Z"}')
})

test("a day's lines open a day that holds none", () => {
  expect(completionsWith(null, FIRST)).toBe(`${completionLine(FIRST)}\n`)
})

test("a day's lines keep the order the instants were marked in", () => {
  expect(completionsWith(`${completionLine(LATER)}\n`, FIRST)).toBe(
    `${completionLine(FIRST)}\n${completionLine(LATER)}\n`
  )
})

test("a day refuses a completion already there, so a rerun files nothing twice", () => {
  expect(
    completionsWith(`${completionLine(FIRST)}\n`, {
      ...FIRST,
      id: "019db533-f3b3-0000-0000-000000000000",
    })
  ).toBeNull()
})

test("a day gives a completion back up by its id", () => {
  const held = `${completionLine(FIRST)}\n${completionLine(LATER)}\n`
  expect(completionsWithout(held, LATER.id)).toBe(`${completionLine(FIRST)}\n`)
  expect(completionsWithout(held, "019db533-f3b3-0000-0000-000000000000")).toBeNull()
  expect(completionsWithout(null, LATER.id)).toBeNull()
})

test("a day whose last line goes is left holding nothing rather than a newline", () => {
  expect(completionsWithout(`${completionLine(FIRST)}\n`, FIRST.id)).toBe("")
})

test("a blank line in a day is dropped and a line that is no JSON is kept", () => {
  const one = { id: "a", completedAt: "2026-03-05T12:00:00.000Z", title: "One" }
  const two = { id: "b", completedAt: "2026-03-05T13:00:00.000Z", title: "Two" }
  expect(completionsWith(`\n\n${completionLine(one)}\n\n`, two)).toBe(
    `${completionLine(one)}\n${completionLine(two)}\n`
  )
  expect(completionsWith("not json\n", two)).toBe(`not json\n${completionLine(two)}\n`)
})

test("a day page is the body that landed for that day", () => {
  expect(completedDayBody("2026-03-05", "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978")).toBe(
    [
      'import type { TemperCompletedDay } from "../../temper-completed-day.page-type.ts"',
      "",
      "export const day20260305 = {",
      '  id: "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978",',
      '  pageTypeSlug: "temper-completed-day",',
      '  slug: "day-2026-03-05",',
      '  title: "2026-03-05",',
      '  day: "2026-03-05",',
      '  completions: "jsonl",',
      "} as const satisfies TemperCompletedDay",
      "",
    ].join("\n")
  )
})

test("the commit message names the task, or the title where it names no task", () => {
  expect(completionCommitMessage({ ...FIRST, task: "hireling-mails" }, "2026-03-05")).toBe(
    "temper: a completion of hireling-mails on 2026-03-05"
  )
  expect(completionCommitMessage(FIRST, "2026-03-05")).toBe(
    "temper: a completion of Dev Tracker on 2026-03-05"
  )
  expect(
    completionCommitMessage({ id: "i", completedAt: "2026-03-05T12:00:00.000Z" }, "2026-03-05")
  ).toBe("temper: a completion of a task on 2026-03-05")
})

test("a day no page is there for takes the page and the lines in one write", async () => {
  const { deps, wrote } = store([], [{ ok: true, at: "c1" }])
  const landed = await landCompletion(FIRST, () => "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978", deps)
  expect(landed).toEqual({ outcome: "landed", at: "c1" })
  expect(wrote).toEqual([
    {
      given: [
        {
          path: PAGE_PATH,
          content: completedDayBody("2026-03-05", "01a05fe3-09ca-7e72-8b3e-e6b34e0d2978"),
        },
        { path: LINES_PATH, content: `${completionLine(FIRST)}\n` },
      ],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "temper: a completion of Dev Tracker on 2026-03-05",
      read: "read-commit",
    },
  ])
})

test("a day whose page is there takes only the lines", async () => {
  const { deps, wrote } = store(
    [{ path: PAGE_PATH, content: "whatever" }],
    [{ ok: true, at: "c1" }]
  )
  await landCompletion(FIRST, () => "unused", deps)
  expect(wrote).toEqual([
    {
      given: [{ path: LINES_PATH, content: `${completionLine(FIRST)}\n` }],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "temper: a completion of Dev Tracker on 2026-03-05",
      read: "read-commit",
    },
  ])
})

test("a completion already on the day counts as landed rather than as a refusal", async () => {
  const { deps, wrote } = store([{ path: LINES_PATH, content: `${completionLine(FIRST)}\n` }], [])
  expect(await landCompletion(FIRST, () => "unused", deps)).toEqual({
    outcome: "already",
    at: "read-commit",
  })
  expect(wrote).toEqual([])
})

test("clearing takes the completion off the day and leaves the page alone", async () => {
  const held = `${completionLine(FIRST)}\n${completionLine(LATER)}\n`
  const { deps, wrote } = store([{ path: LINES_PATH, content: held }], [{ ok: true, at: "c1" }])
  expect(await clearLandedCompletion("2026-03-05", LATER.id, deps)).toEqual({
    outcome: "landed",
    at: "c1",
  })
  expect(wrote).toEqual([
    {
      given: [{ path: LINES_PATH, content: `${completionLine(FIRST)}\n` }],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "temper: a completion on 2026-03-05 was cleared",
      read: "read-commit",
    },
  ])
})

test("clearing a completion no line carries writes nothing back", async () => {
  const { deps, wrote } = store([{ path: LINES_PATH, content: `${completionLine(FIRST)}\n` }], [])
  expect(await clearLandedCompletion("2026-03-05", LATER.id, deps)).toEqual({
    outcome: "already",
    at: "read-commit",
  })
  expect(wrote).toEqual([])
})

test("four writes the store turned back are refused, naming the last reason", async () => {
  const { deps } = store(
    [],
    [
      { ok: false, why: "one" },
      { ok: false, why: "two" },
      { ok: false, why: "three" },
      { ok: false, why: "four" },
    ]
  )
  expect(await landCompletion(FIRST, () => "minted", deps)).toEqual({
    outcome: "refused",
    why: "four — 4 attempts were spent",
  })
})
