import { labelRrule } from "@shared/recurrence/labeling"
import type { Json } from "@shared/supabase-database"
import { JsonSchema } from "@shared/utils-narrow"
import { z } from "zod"
import type { Action, AutomationRow, Matcher, Trigger, ValueExpr } from "./types"

export const AUTOMATION_PAGE_TYPE_SLUG = "automation"

export const ENABLED_AUTOMATIONS_QUERY = "enabled-automations"

export const LAST_FIRED_OCCURRENCE_KEY = "last-fired-occurrence"

const jsonValueSchema: z.ZodType<ValueExpr> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(z.string(), jsonValueSchema),
  ])
)

const matcherSchema: z.ZodType<Matcher> = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("is_empty") }),
  z.object({ kind: z.literal("is_not_empty") }),
  z.object({ kind: z.literal("equals"), value: jsonValueSchema }),
  z.object({ kind: z.literal("not_equals"), value: jsonValueSchema }),
  z.object({ kind: z.literal("truthy") }),
  z.object({ kind: z.literal("falsy") }),
])

type PageConditionShape =
  | { key: string; eq: Json }
  | { key: string; neq: Json }
  | { key: string; lt: Json }
  | { key: string; gt: Json }
  | { key: string; lte: Json }
  | { key: string; gte: Json }
  | { key: string; isNull: true }
  | { key: string; in: readonly Json[] }
  | { key: string; notIn: readonly Json[] }
  | { key: string; contains: string }
  | { key: string; notContains: string }
  | { key: string; includes: Json }
  | { key: string; isEmpty: true }
  | { key: string; isNotEmpty: true }
  | { or: readonly PageConditionShape[] }
const keyField = { key: z.string().min(1) }
const pageConditionSchema: z.ZodType<PageConditionShape> = z.lazy(() =>
  z.union([
    z.object({ ...keyField, eq: JsonSchema }),
    z.object({ ...keyField, neq: JsonSchema }),
    z.object({ ...keyField, lt: JsonSchema }),
    z.object({ ...keyField, gt: JsonSchema }),
    z.object({ ...keyField, lte: JsonSchema }),
    z.object({ ...keyField, gte: JsonSchema }),
    z.object({ ...keyField, isNull: z.literal(true) }),
    z.object({ ...keyField, in: z.array(JsonSchema) }),
    z.object({ ...keyField, notIn: z.array(JsonSchema) }),
    z.object({ ...keyField, contains: z.string() }),
    z.object({ ...keyField, notContains: z.string() }),
    z.object({ ...keyField, includes: JsonSchema }),
    z.object({ ...keyField, isEmpty: z.literal(true) }),
    z.object({ ...keyField, isNotEmpty: z.literal(true) }),
    z.object({ or: z.array(pageConditionSchema) }),
  ])
)
const pageWhereSchema = z.array(pageConditionSchema)

const propertyIdsSchema = z
  .union([z.string().min(1), z.array(z.string().min(1)).min(1)])
  .transform((value): readonly string[] => (Array.isArray(value) ? value : [value]))

const propertyChangedToSchema = z
  .object({
    kind: z.literal("property_changed_to"),
    propertyId: propertyIdsSchema,
    to: matcherSchema,
    from: matcherSchema.optional(),
  })
  .transform(({ propertyId, ...rest }) => ({ ...rest, propertyIds: propertyId }))

const createdSchema = z
  .object({
    kind: z.literal("created"),
    propertyId: propertyIdsSchema,
    to: matcherSchema,
  })
  .transform(({ propertyId, ...rest }) => ({ ...rest, propertyIds: propertyId }))

const invokedSchema = z
  .object({
    kind: z.literal("invoked"),
    propertyId: propertyIdsSchema,
  })
  .transform(({ propertyId, ...rest }) => ({ ...rest, propertyIds: propertyId }))

const scheduleSchema = z.object({
  kind: z.literal("schedule"),
  rrule: z
    .string()
    .min(1)
    .refine((r) => {
      try {
        labelRrule(r, { anchorFromCompletion: false })
        return true
      } catch {
        return false
      }
    }),
  resetDomain: z.union([z.literal("eso-na"), z.literal("us-mountain")]),
  activityConditions: z.array(z.string().min(1)).optional(),
})

const triggerSchema: z.ZodType<Trigger> = z.union([
  propertyChangedToSchema,
  createdSchema,
  invokedSchema,
  scheduleSchema,
])

const actionSchema: z.ZodType<Action> = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("create_page"),
    pageTypeSlug: z.string().min(1),
    properties: z.record(z.string(), jsonValueSchema),
    condition: jsonValueSchema.optional(),
  }),
  z.object({
    kind: z.literal("patch_source"),
    set: z.record(z.string(), jsonValueSchema),
    condition: jsonValueSchema.optional(),
  }),
  z.object({
    kind: z.literal("patch_relation"),
    relationPropertyId: z.string().min(1),
    pageTypeSlug: z.string().min(1),
    set: z.record(z.string(), jsonValueSchema),
    condition: jsonValueSchema.optional(),
  }),
  z.object({
    kind: z.literal("patch_referrers"),
    referrerPageTypeSlug: z.string().min(1),
    viaRelationPropertyId: z.string().min(1),
    viaRelationCardinality: z.union([z.literal("single"), z.literal("multi")]),
    where: pageWhereSchema.optional(),
    set: z.record(z.string(), jsonValueSchema),
    condition: jsonValueSchema.optional(),
  }),
  z.object({
    kind: z.literal("patch_matching"),
    pageTypeSlug: z.string().min(1),
    where: pageWhereSchema.min(1),
    set: z.record(z.string(), jsonValueSchema),
    condition: jsonValueSchema.optional(),
  }),
  z.object({
    kind: z.literal("undelete_relation"),
    relationPropertyId: z.string().min(1),
    pageTypeSlug: z.string().min(1),
    condition: jsonValueSchema.optional(),
  }),
  z.object({
    kind: z.literal("delete_source"),
    condition: jsonValueSchema.optional(),
  }),
  z.object({
    kind: z.literal("notify"),
    userId: jsonValueSchema,
    title: jsonValueSchema,
    body: jsonValueSchema.optional(),
    link: jsonValueSchema.optional(),
    notifyKind: jsonValueSchema.optional(),
    notifySource: jsonValueSchema.optional(),
    condition: jsonValueSchema.optional(),
  }),
])

export type AutomationRead =
  | { readonly ok: true; readonly automation: AutomationRow }
  | { readonly ok: false; readonly why: string }

function textAt(row: Readonly<Record<string, unknown>>, ...keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = row[key]
    if (typeof value === "string" && value.length > 0) return value
  }
  return null
}

function isEnabled(value: unknown): boolean {
  return value === true || value === "true"
}

export function readPageAsAutomation(row: Readonly<Record<string, unknown>>): AutomationRead {
  const id = textAt(row, "id")
  if (id === null) return { ok: false, why: "states no id" }

  if (!isEnabled(row.enabled)) return { ok: false, why: `${id} is not enabled` }

  const name = textAt(row, "name", "title") ?? "(unnamed)"

  const triggerParse = triggerSchema.safeParse(row.trigger)
  if (!triggerParse.success) {
    return { ok: false, why: `${id} (${name}) states no trigger this reader knows` }
  }

  const triggerPageTypeSlug = textAt(row, "triggerPageTypeSlug", "page-type", "pageType")
  if (triggerPageTypeSlug === null && triggerParse.data.kind !== "schedule") {
    return {
      ok: false,
      why: `${id} (${name}) watches for a change and names no page type to watch, so nothing can load it`,
    }
  }

  const actionsParse = z.array(actionSchema).safeParse(row.actions)
  if (!actionsParse.success) {
    return { ok: false, why: `${id} (${name}) states actions this reader cannot read` }
  }

  return {
    ok: true,
    automation: {
      id,
      name,
      enabled: true,
      triggerPageTypeSlug,
      trigger: triggerParse.data,
      actions: actionsParse.data,
    },
  }
}

export function parsePageAsAutomation(
  row: Readonly<Record<string, unknown>>
): AutomationRow | null {
  const read = readPageAsAutomation(row)
  return read.ok ? read.automation : null
}
