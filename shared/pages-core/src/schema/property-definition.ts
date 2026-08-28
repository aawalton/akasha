import * as z from "zod"
import { validateDynamicDefault } from "../property-types/dynamic-default"
import { STORAGE_TIERS, type PropertyType } from "../types"
import { colorRuleSchema } from "./color-rule"
import { evaluateSchemaProfile } from "./schema-profile"

export class PropertyDefinitionParseError extends Error {
  readonly field: string
  constructor(args: { field: string; message: string }) {
    super(args.message)
    this.name = "PropertyDefinitionParseError"
    this.field = args.field
  }
}

function deriveStringIdFromTitle(input: string): string {
  const segments = input.split(/[^A-Za-z0-9]+/).filter((s) => s.length > 0)
  if (segments.length === 0) return ""
  const [first, ...rest] = segments
  const head = (first ?? "").toLowerCase()
  const tail = rest.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  return head + tail.join("")
}

const PROPERTY_TYPES = [
  "text",
  "markdown",
  "number",
  "select",
  "multi-select",
  "path-select",
  "calendar-date",
  "calendar-time",
  "instant",
  "boolean",
  "url",
  "relation",
  "multi-relation",
  "rollup",
  "aggregate",
  "formula",
  "json",
  "rrule",
  "progress",
  "rich-document",
  "action-button",
] as const satisfies ReadonlyArray<PropertyType>

const propertyTypeSchema = z.enum(PROPERTY_TYPES)

const sharedPassthroughShape = {
  title: z.string().optional(),
  stringId: z.string().optional(),
  icon: z.string().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  schema: z
    .record(z.string(), z.unknown())
    .optional()
    .superRefine((val, ctx) => {
      if (val === undefined) return
      for (const violation of evaluateSchemaProfile(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `schema is not profile-compliant: ${violation}`,
        })
      }
    }),
  accent: z.boolean().optional(),
  display: z.enum(["badge", "inline"]).optional(),
  defaultOrder: z.number().optional(),
  inherited: z.boolean().optional(),
  columnName: z.string().optional(),
  indexName: z.string().optional(),
  skipRelationMirroring: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  unique: z.boolean().optional(),
  parent: z.boolean().optional(),
  sort: z.enum(["alpha", "manual"]).optional(),
  storage: z.enum(STORAGE_TIERS).optional(),
  groupable: z.boolean().optional(),
  versionExempt: z.boolean().optional(),
  pageType: z.string().optional(),
  defaultValue: z.unknown().optional(),
  colorRules: z.array(colorRuleSchema).optional(),
}

const createSchema = z
  .object({
    ...sharedPassthroughShape,
    pageType: z.string(),
    type: propertyTypeSchema,
  })
  .strict()

const updateSchema = z
  .object({
    ...sharedPassthroughShape,
    type: propertyTypeSchema.optional(),
  })
  .strict()

export type PropertyDefinitionCreateInput = z.infer<typeof createSchema> & {
  stringId: string
}

export type PropertyDefinitionUpdateInput = z.infer<typeof updateSchema>

function raiseFromZodError(
  error: z.ZodError,
  raw: Record<string, unknown>,
  fallbackField: string
): never {
  const issue = error.issues[0]
  if (!issue) {
    throw new PropertyDefinitionParseError({ field: fallbackField, message: error.message })
  }
  if (issue.code === "unrecognized_keys") {
    const offender = issue.keys[0] ?? "<unknown>"
    throw new PropertyDefinitionParseError({
      field: offender,
      message: `unknown field "${offender}" — strict schema rejects unrecognized fields`,
    })
  }
  const field = issue.path.length > 0 ? String(issue.path[0]) : fallbackField
  if (issue.code === "invalid_value") {
    const received = field in raw ? raw[field] : undefined
    const offender = typeof received === "string" ? received : JSON.stringify(received)
    throw new PropertyDefinitionParseError({
      field,
      message: `${issue.message} (received "${offender}")`,
    })
  }
  throw new PropertyDefinitionParseError({ field, message: issue.message })
}

function rejectLegacyPropertyType(raw: Record<string, unknown>): undefined {
  if (Object.hasOwn(raw, "propertyType")) {
    throw new PropertyDefinitionParseError({
      field: "propertyType",
      message: "propertyType is a legacy attribute name; use type (consolidation per #8855)",
    })
  }
}

export function parsePropertyDefinitionCreate(
  raw: Record<string, unknown>
): PropertyDefinitionCreateInput {
  rejectLegacyPropertyType(raw)

  const result = createSchema.safeParse(raw)
  if (!result.success) raiseFromZodError(result.error, raw, "body")
  const parsed = result.data

  const dynamicError = validateDynamicDefault(parsed.defaultValue, parsed.type)
  if (dynamicError !== null) {
    throw new PropertyDefinitionParseError({ field: "defaultValue", message: dynamicError })
  }

  let stringId = parsed.stringId
  if (stringId === undefined || stringId === "") {
    if (parsed.title === undefined || parsed.title === "") {
      throw new PropertyDefinitionParseError({
        field: "title",
        message: "title or stringId is required (stringId is auto-derived from title)",
      })
    }
    stringId = deriveStringIdFromTitle(parsed.title)
    if (stringId === "") {
      throw new PropertyDefinitionParseError({
        field: "title",
        message: `title "${parsed.title}" yields an empty stringId; provide stringId explicitly`,
      })
    }
  }

  return { ...parsed, stringId }
}

export function parsePropertyDefinitionUpdate(
  raw: Record<string, unknown>
): PropertyDefinitionUpdateInput {
  rejectLegacyPropertyType(raw)

  const result = updateSchema.safeParse(raw)
  if (!result.success) raiseFromZodError(result.error, raw, "body")
  const parsed = result.data

  const dynamicError = validateDynamicDefault(parsed.defaultValue, parsed.type)
  if (dynamicError !== null) {
    throw new PropertyDefinitionParseError({ field: "defaultValue", message: dynamicError })
  }

  return parsed
}
