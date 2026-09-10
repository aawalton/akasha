import { expect, test } from "bun:test"
import { LANDING_TIMEOUT_MS } from "../harness-call/harness-call.module.code.ts"
import {
  deletingInitiative,
  deletingIntent,
  type Editor,
  initiativeAskedSaid,
  initiativeDetailSaid,
  initiativeFailureSaid,
  initiativeGoneOf,
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

type Asked = { said: string; detail: string; confirm: string }

function editorSaying(shown: string[], asked: Asked[] = [], chosen?: string): Editor {
  return {
    window: {
      showErrorMessage: (said: string) => {
        shown.push(said)
        return undefined
      },
      showWarningMessage: (
        said: string,
        options: { readonly modal: true; readonly detail: string },
        confirm: string
      ) => {
        asked.push({ said, detail: options.detail, confirm })
        return Promise.resolve(chosen)
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
      timeout: LANDING_TIMEOUT_MS,
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

const INITIATIVE = rowOf("initiative", "held", "held")

test("an initiative row answers the slug it is keyed by", () => {
  expect(initiativeGoneOf(INITIATIVE)).toBe("held")
})

test("an intent row answers no initiative", () => {
  expect(initiativeGoneOf(INTENT)).toBe(null)
})

test("no row answers no initiative", () => {
  expect(initiativeGoneOf(undefined)).toBe(null)
})

test("the modal names the initiative and what goes with it", () => {
  expect(initiativeAskedSaid("held")).toBe("Delete the initiative held?")
  expect(initiativeDetailSaid("held")).toBe(
    "held goes with every intent it holds. A seat assigned to it keeps that assignment."
  )
})

test("an initiative goes once Alan answers the modal with the confirming word", async () => {
  const kept: Said[] = []
  const asked: Asked[] = []
  const lines: string[] = []
  await deletingInitiative(
    editorSaying([], asked, "Delete"),
    (line) => {
      lines.push(line)
      return undefined
    },
    callingWith("held is gone", kept)
  )(INITIATIVE)

  expect(asked).toEqual([
    {
      said: "Delete the initiative held?",
      detail: "held goes with every intent it holds. A seat assigned to it keeps that assignment.",
      confirm: "Delete",
    },
  ])
  expect(kept).toEqual([
    {
      module: "initiative-delete",
      exported: "initiativeDelete",
      args: ["held"],
      timeout: LANDING_TIMEOUT_MS,
    },
  ])
  expect(lines).toEqual(["[delete initiative] held is gone"])
})

test("an initiative Alan does not confirm stays, and nothing is said", async () => {
  const kept: Said[] = []
  const lines: string[] = []
  await deletingInitiative(
    editorSaying([], [], undefined),
    (line) => {
      lines.push(line)
      return undefined
    },
    callingWith("held is gone", kept)
  )(INITIATIVE)

  expect(kept).toEqual([])
  expect(lines).toEqual([])
})

test("an intent row is asked nothing and deletes no initiative", async () => {
  const kept: Said[] = []
  const asked: Asked[] = []
  await deletingInitiative(
    editorSaying([], asked, "Delete"),
    () => undefined,
    callingWith("", kept)
  )(INTENT)

  expect(asked).toEqual([])
  expect(kept).toEqual([])
})

test("an initiative that did not go is said to Alan once and written to the channel", async () => {
  const shown: string[] = []
  const lines: string[] = []
  await deletingInitiative(
    editorSaying(shown, [], "Delete"),
    (line) => {
      lines.push(line)
      return undefined
    },
    callingWith(new Error("a page still names it"), [])
  )(INITIATIVE)

  expect(shown).toEqual(["Work: held: the initiative did not go. Error: a page still names it"])
  expect(lines).toEqual([
    "[delete initiative] held: the initiative did not go. Error: a page still names it",
  ])
})

test("a failure is said in words naming the initiative", () => {
  expect(initiativeFailureSaid("held", "why")).toBe("held: the initiative did not go. why")
})
