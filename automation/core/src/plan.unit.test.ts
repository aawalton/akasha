import { describe, expect, test } from "bun:test"
import { type PlannedEffect, planActionsForEvent } from "./plan"
import type { Action, AutomationRow, EmittedEvent, EvaluationContext, Trigger } from "./pure/types"

const TRIGGER_PAGE_TYPE_ID = "pt_task"

function makeUpdatedEvent(patch: Record<string, unknown>): EmittedEvent {
  return {
    type: "updated",
    rowId: "row_1",
    pageTypeSlug: "temper-task",
    patch,
    oldValues: {},
  }
}

function makeAutomation(trigger: Trigger, actions: readonly Action[]): AutomationRow {
  return {
    id: "auto_1",
    name: "test rule",
    enabled: true,
    triggerPageTypeSlug: TRIGGER_PAGE_TYPE_ID,
    trigger,
    actions,
  }
}

const completedToNotEmpty: Trigger = {
  kind: "property_changed_to",
  propertyId: "completedAt",
  to: { kind: "is_not_empty" },
}

function makeCtx(source: Record<string, unknown>): EvaluationContext {
  return {
    source: {
      id: "row_1",
      pageTypeSlug: "temper-task",
      ...source,
      previous: {},
    },
  }
}

describe("planActionsForEvent", () => {
  test("trigger match → patch_source plan with resolved set", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      { kind: "patch_source", set: { completedAt: null, dueDate: "2026-06-01" } },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", dueDate: "2026-05-25" })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([
      {
        kind: "patch_source",
        rowId: "row_1",
        pageTypeSlug: "temper-task",
        set: { completedAt: null, dueDate: "2026-06-01" },
      },
    ])
  })

  test("trigger does not match → no effects", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      { kind: "patch_source", set: { completedAt: null } },
    ])
    const event = makeUpdatedEvent({ completedAt: null })
    const ctx = makeCtx({ completedAt: null })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([])
  })

  test("patch_source noop detection — resolved set already equals source", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      { kind: "patch_source", set: { status: "done" } },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", status: "done" })

    const effects = planActionsForEvent([automation], event, ctx)

    const expected: PlannedEffect = { kind: "noop" }
    expect(effects).toEqual([expected])
  })

  test("condition rejection short-circuits the action", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      { kind: "patch_source", set: { dueDate: "2026-06-01" }, condition: false },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", dueDate: "2026-05-25" })

    const effects = planActionsForEvent([automation], event, ctx)

    const expected: PlannedEffect = { kind: "condition_rejected" }
    expect(effects).toEqual([expected])
  })

  test("create_page produces the non-optimistic described arm", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      {
        kind: "create_page",
        pageTypeSlug: "log-entry",
        properties: { title: "completed", note: "=source.title" },
      },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", title: "My Task" })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([
      {
        kind: "create_page",
        optimistic: false,
        pageTypeSlug: "log-entry",
        properties: { title: "completed", note: "My Task" },
      },
    ])
  })

  test("patch_relation emits id-stable arm when target resolves and no preloaded target", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      {
        kind: "patch_relation",
        relationPropertyId: "project",
        pageTypeSlug: "project",
        set: { lastTouched: "2026-05-31" },
      },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", project: "proj_42" })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([
      {
        kind: "patch_relation",
        rowId: "proj_42",
        pageTypeSlug: "project",
        set: { lastTouched: "2026-05-31" },
      },
    ])
  })

  test("delete_source emits the id-stable arm targeting the source row", () => {
    const automation = makeAutomation(completedToNotEmpty, [{ kind: "delete_source" }])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31" })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([
      { kind: "delete_source", rowId: "row_1", pageTypeSlug: "temper-task" },
    ])
  })

  test("delete_source one-off guard (rrule.rule == null) → emitted for a one-off task", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      { kind: "delete_source", condition: "=source.rrule.rule == null" },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", rrule: null })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([
      { kind: "delete_source", rowId: "row_1", pageTypeSlug: "temper-task" },
    ])
  })

  test("notify resolves its fields and emits the non-optimistic arm", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      {
        kind: "notify",
        userId: "=source.userId",
        title: "Task completed",
        body: "=source.title",
        link: "/tasks",
        notifyKind: "task-completion",
        notifySource: "automations",
      },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", userId: "user_7", title: "My Task" })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([
      {
        kind: "notify",
        optimistic: false,
        userId: "user_7",
        title: "Task completed",
        body: "My Task",
        link: "/tasks",
        notifyKind: "task-completion",
        notifySource: "automations",
      },
    ])
  })

  test("notify optional fields absent on the action resolve to null", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      { kind: "notify", userId: "=source.userId", title: "Done" },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", userId: "user_7" })

    const effects = planActionsForEvent([automation], event, ctx)

    expect(effects).toEqual([
      {
        kind: "notify",
        optimistic: false,
        userId: "user_7",
        title: "Done",
        body: null,
        link: null,
        notifyKind: null,
        notifySource: null,
      },
    ])
  })

  test("notify condition rejection short-circuits the action", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      {
        kind: "notify",
        userId: "=source.userId",
        title: "Done",
        condition: false,
      },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({ completedAt: "2026-05-31", userId: "user_7" })

    const effects = planActionsForEvent([automation], event, ctx)

    const expected: PlannedEffect = { kind: "condition_rejected" }
    expect(effects).toEqual([expected])
  })

  test("delete_source one-off guard → condition_rejected for a recurring task", () => {
    const automation = makeAutomation(completedToNotEmpty, [
      { kind: "delete_source", condition: "=source.rrule.rule == null" },
    ])
    const event = makeUpdatedEvent({ completedAt: "2026-05-31" })
    const ctx = makeCtx({
      completedAt: "2026-05-31",
      rrule: { rule: "FREQ=DAILY", anchorFromCompletion: false },
    })

    const effects = planActionsForEvent([automation], event, ctx)

    const expected: PlannedEffect = { kind: "condition_rejected" }
    expect(effects).toEqual([expected])
  })
})
