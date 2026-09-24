import { expect, test } from "bun:test"
import { LANDING_TIMEOUT_MS } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import type { Editor } from "akasha/code/editor/extension/modules/panel-acting/panel-acting.module.code.ts"
import { editorShowing } from "akasha/code/editor/extension/modules/panel-acting/panel-acting.module.test-fixtures.ts"
import {
  type Assigning,
  assignDoneSaid,
  assignFailureSaid,
  assigningInitiative,
  type WorkAssignWatch,
} from "akasha/code/editor/extension/modules/work-tree-assigning/work-tree-assigning.module.code.ts"
import {
  shownOn,
  titleOf,
} from "akasha/code/editor/extension/modules/work-tree-assigning/work-tree-assigning.module.test-fixtures.ts"
import {
  callingWith,
  type Said,
} from "akasha/code/editor/extension/modules/work-tree-deleting/work-tree-deleting.module.test-fixtures.ts"
import { rowOf } from "akasha/code/editor/extension/modules/work-tree-holding/work-tree-holding.module.test-fixtures.ts"
import { ASSIGN_COMMAND } from "akasha/code/editor/extension/modules/work-tree-ids/work-tree-ids.module.code.ts"
import { PUT_BACK } from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"

const INITIATIVE = rowOf("initiative", "held", "held")

const INTENT = rowOf("intent", "held#2", "A thing is so.")

function editorSaying(shown: string[], noted: string[] = []): Editor {
  return editorShowing({
    showErrorMessage: (said: string) => {
      shown.push(said)
      return undefined
    },
    showInformationMessage: (said: string) => {
      noted.push(said)
      return undefined
    },
  })
}

function watching(told: string[]): WorkAssignWatch {
  return {
    assigning: (one: Assigning) => {
      told.push(`assigning ${one.slug} to ${one.seat}`)
      return undefined
    },
    answered: (slug: string) => {
      told.push(`answered ${slug}`)
      return undefined
    },
    stayed: (slug: string) => {
      told.push(`stayed ${slug}`)
      return undefined
    },
  }
}

test("assigning names the initiative to the command that assigns it", async () => {
  const kept: Said[] = []
  const lines: string[] = []
  const noted: string[] = []
  const told: string[] = []
  await assigningInitiative(
    editorSaying([], noted),
    (line) => {
      lines.push(line)
      return undefined
    },
    watching(told),
    callingWith("held answers to initiative/held\nabc1234", kept)
  )(INITIATIVE)

  expect(kept).toEqual([
    {
      module: "initiative-assign",
      exported: "initiativeAssign",
      args: ["held"],
      timeout: LANDING_TIMEOUT_MS,
    },
  ])
  expect(lines).toEqual(["[assign] held answers to initiative/held\nabc1234"])
  expect(noted).toEqual(["Work: held answers to initiative/held"])
  expect(told).toEqual(["assigning held to held", "answered held"])
})

test("a row that is no initiative calls nothing and tells the panel nothing", async () => {
  const kept: Said[] = []
  const told: string[] = []
  await assigningInitiative(
    editorSaying([]),
    () => undefined,
    watching(told),
    callingWith("", kept)
  )(INTENT)

  expect(kept).toEqual([])
  expect(told).toEqual([])
})

test("an assignment that failed is said to Alan once and written to the channel", async () => {
  const shown: string[] = []
  const lines: string[] = []
  const told: string[] = []
  await assigningInitiative(
    editorSaying(shown),
    (line) => {
      lines.push(line)
      return undefined
    },
    watching(told),
    callingWith(new Error("the seat held is not running, so held was assigned to nobody"), [])
  )(INITIATIVE)

  expect(told).toEqual(["assigning held to held", "stayed held"])
  expect(shown).toEqual([
    "Work: held: the initiative was not assigned. Error: the seat held is not running," +
      " so held was assigned to nobody",
  ])
  expect(lines).toEqual([
    "[assign] held: the initiative was not assigned. Error: the seat held is not running," +
      " so held was assigned to nobody",
  ])
})

test("a failure is said in words naming the initiative", () => {
  expect(assignFailureSaid("held", "why")).toBe("held: the initiative was not assigned. why")
})

test("the line shown to Alan is the first line the command said", () => {
  expect(assignDoneSaid("held answers to initiative/held\nabc1234\n")).toBe(
    "held answers to initiative/held"
  )
})

const REFUSED = `akasha/a.domain.ts — what is on disk is not the body you read, ${PUT_BACK}`

test("an assignment refused because the page moved is said to Alan as one sentence", async () => {
  const shown: string[] = []
  await assigningInitiative(
    editorSaying(shown),
    () => undefined,
    watching([]),
    callingWith(new Error(REFUSED), [])
  )(INITIATIVE)

  expect(shown).toEqual(["Work: that moved while you were assigning it — nothing was assigned"])
})

test("a refusal saying that seat answers to that initiative already leaves it stayed", async () => {
  const told: string[] = []
  await assigningInitiative(
    editorSaying([]),
    () => undefined,
    watching(told),
    callingWith(new Error("`initiative/held` is what `assignmentSlug` states already"), [])
  )(INITIATIVE)

  expect(told).toEqual(["assigning held to held", "stayed held"])
})

test("an initiative row is offered assign", () => {
  expect([...shownOn("initiative")]).toContain(ASSIGN_COMMAND)
})

test("a row that is no initiative is offered no assign", () => {
  expect([...shownOn("intent")]).not.toContain(ASSIGN_COMMAND)
  expect([...shownOn("root")]).not.toContain(ASSIGN_COMMAND)
})

test("the item Alan reads on that menu is titled Assign", () => {
  expect(titleOf(ASSIGN_COMMAND)).toBe("Assign")
})
