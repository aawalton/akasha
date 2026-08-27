import { describe, expect, test } from "bun:test"
import { makeAutomationIndex } from "@automation/core/index/automation-index"
import type { Action, AutomationRow, Trigger } from "@automation/core/pure/types"
import type { Json } from "../../../supabase-database/src/generated/database"
import { computeOptimisticAutomationSet } from "./optimistic-automations"

const TASK_SLUG = "temper-task"
const ROW_ID = "row_task_1"

const completedToNotEmpty: Trigger = {
  kind: "property_changed_to",
  propertyId: "completedAt",
  to: { kind: "is_not_empty" },
}

const taskCompletionActions: readonly Action[] = [
  {
    kind: "patch_source",
    set: {
      completedAt: null,
      lastCompletedAt: "=source.completedAt",
      dueDate: "=addDays(source.dueDate, 7)",
    },
  },
]

const oneOffCompletionActions: readonly Action[] = [
  {
    kind: "patch_source",
    set: {
      completedAt: null,
      lastCompletedAt: "=source.completedAt",
    },
  },
  { kind: "delete_source", condition: "=source.rrule.rule == null" },
]

function makeIndex(rows: readonly AutomationRow[]) {
  const index = makeAutomationIndex()
  index.rebuild(rows)
  return index
}

function makeAutomation(
  trigger: Trigger,
  actions: readonly Action[],
  overrides: Partial<AutomationRow> = {}
): AutomationRow {
  return {
    id: "auto_task_completion",
    name: "temper-task completion",
    enabled: true,
    triggerPageTypeSlug: TASK_SLUG,
    trigger,
    actions,
    ...overrides,
  }
}

describe("computeOptimisticAutomationSet", () => {
  test("temper-task completion → merged patch_source set (cleared + snapshot + advanced)", () => {
    const index = makeIndex([makeAutomation(completedToNotEmpty, taskCompletionActions)])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: { completedAt: null, dueDate: "2026-05-25", lastCompletedAt: null },
      automationIndex: index,
    })

    expect(result).toEqual({
      set: {
        completedAt: null,
        lastCompletedAt: "2026-05-31",
        dueDate: "2026-06-01",
      },
      softDeleteSource: false,
    })
  })

  test("no matching automation for the page-type → null (caller uses normal path)", () => {
    const index = makeIndex([
      makeAutomation(completedToNotEmpty, taskCompletionActions, {
        triggerPageTypeSlug: "other-type",
      }),
    ])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: { completedAt: null, dueDate: "2026-05-25" },
      automationIndex: index,
    })

    expect(result).toBeNull()
  })

  test("trigger present but does not fire (wrong property) → null", () => {
    const index = makeIndex([makeAutomation(completedToNotEmpty, taskCompletionActions)])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { status: "done" },
      currentRow: { completedAt: null, dueDate: "2026-05-25" },
      automationIndex: index,
    })

    expect(result).toBeNull()
  })

  test("automation whose only effect is create_page → null (not applied in v1)", () => {
    const createOnly: readonly Action[] = [
      {
        kind: "create_page",
        pageTypeSlug: "log-entry",
        properties: { note: "task completed" },
      },
    ]
    const index = makeIndex([makeAutomation(completedToNotEmpty, createOnly)])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: { completedAt: null },
      automationIndex: index,
    })

    expect(result).toBeNull()
  })

  test("merge precedence — automation overrides the user patch on completedAt", () => {
    const index = makeIndex([
      makeAutomation(completedToNotEmpty, [{ kind: "patch_source", set: { completedAt: null } }]),
    ])

    const prediction = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: { completedAt: null },
      automationIndex: index,
    })

    expect(prediction).toEqual({ set: { completedAt: null }, softDeleteSource: false })

    const userPatch = { completedAt: "2026-05-31" }
    const merged: Record<string, Json> = { ...userPatch, ...(prediction?.set ?? {}) }
    expect(merged).toEqual({ completedAt: null })
  })

  test("patch_source targeting a different row id is not merged into the source set", () => {
    const index = makeIndex([
      makeAutomation(completedToNotEmpty, [
        { kind: "patch_source", set: { dueDate: "2026-05-25" } },
      ]),
    ])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: { completedAt: null, dueDate: "2026-05-25" },
      automationIndex: index,
    })

    expect(result).toBeNull()
  })

  test("one-off completion (rrule null) → softDeleteSource true + patch set present", () => {
    const index = makeIndex([makeAutomation(completedToNotEmpty, oneOffCompletionActions)])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: { completedAt: null, lastCompletedAt: null, rrule: null },
      automationIndex: index,
    })

    expect(result).toEqual({
      set: { completedAt: null, lastCompletedAt: "2026-05-31" },
      softDeleteSource: true,
    })
  })

  test("invoked-triggered automation IS optimistically predicted (D #14215 seam live)", () => {
    const invokedTrigger: Trigger = { kind: "invoked", propertyIds: ["trainButton"] }
    const xpBump: readonly Action[] = [{ kind: "patch_source", set: { xp: "=source.xp + 10" } }]
    const index = makeIndex([makeAutomation(invokedTrigger, xpBump)])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { trainButton: { lastInvokedAt: "2026-06-01T00:00:00Z" } },
      currentRow: { xp: 0 },
      automationIndex: index,
    })

    expect(result).toEqual({ set: { xp: 10 }, softDeleteSource: false })
  })

  test("invoked trigger does NOT fire when its watched key is absent from the patch (non-invoked byte-identical)", () => {
    const invokedTrigger: Trigger = { kind: "invoked", propertyIds: ["trainButton"] }
    const xpBump: readonly Action[] = [{ kind: "patch_source", set: { xp: "=source.xp + 10" } }]
    const index = makeIndex([makeAutomation(invokedTrigger, xpBump)])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: { xp: 0, completedAt: null },
      automationIndex: index,
    })

    expect(result).toBeNull()
  })

  test("recurring completion (rrule present) → softDeleteSource false, patch set still present", () => {
    const index = makeIndex([makeAutomation(completedToNotEmpty, oneOffCompletionActions)])

    const result = computeOptimisticAutomationSet({
      pageTypeSlug: TASK_SLUG,
      rowId: ROW_ID,
      userPatch: { completedAt: "2026-05-31" },
      currentRow: {
        completedAt: null,
        lastCompletedAt: null,
        rrule: { rule: "FREQ=DAILY", anchorFromCompletion: false },
      },
      automationIndex: index,
    })

    expect(result).toEqual({
      set: { completedAt: null, lastCompletedAt: "2026-05-31" },
      softDeleteSource: false,
    })
  })
})
