import { expect, test } from "bun:test"
import {
  deletingIntent,
  type Editor,
  intentFailureSaid,
  intentGoneOf,
} from "./work-tree-deleting.module.code.ts"

function rowOf(kind: WorkTreeRow["kind"], key: string, label: string): WorkTreeRow {
  return { kind, key, label, at: null, color: null, detail: null, note: null, children: [] }
}

const INTENT = rowOf("intent", "held#2", "A thing is so.")

type Said = { module: string; exported: string; args: readonly string[]; timeout: number }

function callingWith(answer: string | Error, kept: Said[]) {
  return async (
    module: string,
    exported: string,
    args: readonly string[],
    options: { readonly timeout: number }
  ): Promise<string> => {
    kept.push({ module, exported, args, timeout: options.timeout })
    if (answer instanceof Error) throw answer
    return answer
  }
}

function editorSaying(shown: string[]): Editor {
  return {
    window: {
      showErrorMessage: (said: string) => {
        shown.push(said)
        return undefined
      },
    },
  }
}

test("an intent row answers its initiative and its statement", () => {
  expect(intentGoneOf(INTENT)).toEqual({ slug: "held", statement: "A thing is so." })
})

test("an initiative row answers nothing to delete as an intent", () => {
  expect(intentGoneOf(rowOf("initiative", "held", "held"))).toBe(null)
})

test("no row answers nothing", () => {
  expect(intentGoneOf(undefined)).toBe(null)
})

test("a row drawn under no label answers nothing", () => {
  expect(intentGoneOf(rowOf("intent", "held#1", ""))).toBe(null)
})

test("deleting an intent names the initiative and the statement to the command", async () => {
  const kept: Said[] = []
  const lines: string[] = []
  await deletingIntent(
    editorSaying([]),
    (line) => {
      lines.push(line)
      return undefined
    },
    callingWith("held: the intent is gone", kept)
  )(INTENT)

  expect(kept).toEqual([
    {
      module: "initiative-delete-intent",
      exported: "initiativeDeleteIntent",
      args: ["held", "A thing is so."],
      timeout: 60_000,
    },
  ])
  expect(lines).toEqual(["[delete intent] held: the intent is gone"])
})

test("a row that is no intent calls nothing", async () => {
  const kept: Said[] = []
  await deletingIntent(
    editorSaying([]),
    () => undefined,
    callingWith("", kept)
  )(rowOf("initiative", "held", "held"))

  expect(kept).toEqual([])
})

test("a deletion that failed is said to Alan once and written to the channel", async () => {
  const shown: string[] = []
  const lines: string[] = []
  await deletingIntent(
    editorSaying(shown),
    (line) => {
      lines.push(line)
      return undefined
    },
    callingWith(new Error("the page would not open"), [])
  )(INTENT)

  expect(shown).toEqual([
    "Work: held: the intent `A thing is so.` did not go. Error: the page would not open",
  ])
  expect(lines).toEqual([
    "[delete intent] held: the intent `A thing is so.` did not go. Error: the page would not open",
  ])
})

test("a failure is said in words naming the initiative and the statement", () => {
  expect(intentFailureSaid({ slug: "held", statement: "A thing is so." }, "why")).toBe(
    "held: the intent `A thing is so.` did not go. why"
  )
})
