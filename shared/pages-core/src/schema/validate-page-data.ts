import { instantToMillis } from "../property-types/instant"
import { validateProgressValue } from "../property-types/progress"
import { validateRichDocumentValue } from "../property-types/rich-document"
import { PropertyDefinitionSchema, parseConfig, type ReadonlyJSONValue } from "./pages"
import { numberConfigSchema, pathSelectConfigSchema, selectConfigSchema } from "./property-config-schemas"

interface ValidationError {
  propertyId: string
  message: string
}

interface ValidationResult {
  valid: boolean
  errors: readonly ValidationError[]
}

const URL_REGEX = /^https?:\/\/.+/

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

type ValueValidator = (
  value: ReadonlyJSONValue | undefined,
  config: Record<string, ReadonlyJSONValue> | undefined
) => string | null

function isNullish(value: ReadonlyJSONValue | undefined): value is null | undefined {
  return value === null || value === undefined || value === ""
}

const validators: Record<string, ValueValidator> = {
  text: () => null,
  markdown: () => null,
  json: () => null,
  boolean: () => null,

  number(value, config) {
    if (isNullish(value)) return null
    const n = Number(value)
    if (Number.isNaN(n)) return "Must be a number"
    const c = parseConfig(numberConfigSchema, config, { format: "number" })
    if (c.min !== undefined && n < c.min) return `Must be at least ${c.min}`
    if (c.max !== undefined && n > c.max) return `Must be at most ${c.max}`
    return null
  },

  select(value, config) {
    if (isNullish(value)) return null
    if (typeof value !== "string") return "Select value must be a string"
    const c = parseConfig(selectConfigSchema, config, { options: [] })
    const options = c.options
    if (!options.some((o) => o.id === value)) return "Invalid option"
    return null
  },

  "multi-select"(value, config) {
    if (value == null) return null
    if (!Array.isArray(value)) return "Multi-select value must be an array"
    const c = parseConfig(selectConfigSchema, config, { options: [] })
    const options = c.options
    for (const id of value) {
      if (typeof id !== "string") return "Multi-select values must be strings"
      if (!options.some((o) => o.id === id)) return `Invalid option: ${id}`
    }
    return null
  },

  "path-select"(value, config) {
    if (value == null) return null
    if (!Array.isArray(value)) return "path-select value must be an array"
    for (const seg of value) {
      if (typeof seg !== "string" && typeof seg !== "number") {
        return "path-select segments must be strings or numbers"
      }
    }
    const c = parseConfig(pathSelectConfigSchema, config, { providerId: "" })
    if (c.requiredDepth !== undefined && value.length < c.requiredDepth) {
      return `Path must have at least ${c.requiredDepth} segments`
    }
    if (c.maxDepth !== undefined && value.length > c.maxDepth) {
      return `Path must have at most ${c.maxDepth} segments`
    }
    return null
  },

  "calendar-date"(value) {
    if (isNullish(value)) return null
    if (typeof value !== "string") return "Date must be a string"
    if (!DATE_REGEX.test(value)) return "Date must be in YYYY-MM-DD format"
    return null
  },

  "calendar-time"(value) {
    if (isNullish(value)) return null
    if (typeof value !== "string") return "Time must be a string"
    if (!TIME_REGEX.test(value)) return "Time must be in HH:MM format"
    return null
  },

  instant(value) {
    if (isNullish(value)) return null
    if (instantToMillis(value) !== null) return null
    return "Instant must be a number or ISO 8601 datetime string"
  },

  url(value) {
    if (isNullish(value)) return null
    if (typeof value !== "string") return "URL must be a string"
    if (!URL_REGEX.test(value)) return "Invalid URL"
    return null
  },

  relation(value) {
    if (isNullish(value)) return null
    if (typeof value !== "string") return "Relation value must be a string"
    return null
  },

  "multi-relation"(value) {
    if (value == null) return null
    if (!Array.isArray(value)) return "Multi-relation value must be an array"
    for (const id of value) {
      if (typeof id !== "string") return "Multi-relation values must be strings"
    }
    return null
  },

  rollup: () => null,

  aggregate: () => null,

  formula: () => null,

  rrule(value) {
    if (isNullish(value)) return null
    if (typeof value !== "object" || Array.isArray(value)) {
      return "rrule value must be an object"
    }
    const rule: unknown = Reflect.get(value, "rule")
    if (typeof rule !== "string") return "rrule.rule must be a string"
    if (rule.length === 0) return "rrule.rule must be non-empty"
    const anchor: unknown = Reflect.get(value, "anchorFromCompletion")
    if (typeof anchor !== "boolean") {
      return "rrule.anchorFromCompletion must be a boolean"
    }
    return null
  },

  progress(value) {
    return validateProgressValue(value)
  },

  "rich-document"(value) {
    return validateRichDocumentValue(value)
  },

  "action-button"(value) {
    if (isNullish(value)) return null
    if (typeof value !== "object" || Array.isArray(value)) {
      return "Action value must be an invocation-record object"
    }
    const last: unknown = Reflect.get(value, "lastInvokedAt")
    if (last !== undefined && typeof last !== "string") {
      return "action-button lastInvokedAt must be a string"
    }
    return null
  },
}

export function validatePageData(
  properties: Readonly<Record<string, ReadonlyJSONValue>>,
  propertyDefinitions: ReadonlyArray<{
    id: string
    title: string
    type: string
    config?: Readonly<Record<string, ReadonlyJSONValue>>
  }>
): ValidationResult {
  const errors: ValidationError[] = []

  for (const def of propertyDefinitions) {
    const parsed = PropertyDefinitionSchema.safeParse(def)
    if (!parsed.success) continue

    const typedDef = parsed.data
    const validator = validators[typedDef.type]
    if (!validator) continue

    const value = properties[def.id]
    const message = validator(value, typedDef.config ?? undefined)

    if (message != null) {
      errors.push({ propertyId: def.id, message })
    }
  }

  return { valid: errors.length === 0, errors }
}

export interface SelectWriteViolation {
  readonly propertyId: string
  readonly propertyType: "select" | "multi-select"
  readonly value: ReadonlyJSONValue | undefined
  readonly message: string
  readonly validOptionIds: readonly string[]
}

export function evaluateSelectWrite(
  properties: Readonly<Record<string, ReadonlyJSONValue>>,
  propertyDefinitions: ReadonlyArray<{
    id: string
    title: string
    type: string
    config?: ReadonlyJSONValue
  }>
): readonly SelectWriteViolation[] {
  const violations: SelectWriteViolation[] = []

  for (const def of propertyDefinitions) {
    if (def.type !== "select" && def.type !== "multi-select") continue

    const parsed = PropertyDefinitionSchema.safeParse(def)
    if (!parsed.success) continue

    const typedDef = parsed.data
    if (typedDef.type !== "select" && typedDef.type !== "multi-select") continue
    const validator = validators[typedDef.type]
    if (!validator) continue

    const value = properties[def.id]
    const message = validator(value, typedDef.config ?? undefined)
    if (message == null) continue

    const options = parseConfig(selectConfigSchema, typedDef.config ?? undefined, {
      options: [],
    }).options
    violations.push({
      propertyId: def.id,
      propertyType: typedDef.type,
      value,
      message,
      validOptionIds: options.map((o) => o.id),
    })
  }

  return violations
}
