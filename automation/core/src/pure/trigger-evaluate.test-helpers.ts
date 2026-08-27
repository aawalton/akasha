import type { EmittedEvent, Trigger } from "./types"

export function asTrigger(value: unknown): Trigger {
  return value as Trigger
}

export function updatedEvent(opts: {
  patch: Record<string, unknown>
  oldValues?: Record<string, unknown>
  pageTypeSlug?: string
}): EmittedEvent {
  return {
    type: "updated",
    rowId: "row-1",
    pageTypeSlug: opts.pageTypeSlug ?? "task",
    patch: opts.patch,
    oldValues: opts.oldValues ?? {},
  }
}

export function createdEvent(opts: {
  fields: Record<string, unknown>
  pageTypeSlug?: string
}): EmittedEvent {
  return {
    type: "created",
    rowId: "row-1",
    pageTypeSlug: opts.pageTypeSlug ?? "task",
    fields: opts.fields,
  }
}
