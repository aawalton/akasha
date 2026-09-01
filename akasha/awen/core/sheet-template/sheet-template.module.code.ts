import { isRecord } from "@akasha/utils-narrow/is-record"
import { z } from "zod"

export const SheetEntryStandardSchema = z
  .object({
    class: z.string(),
    path: z.string(),
    textField: z.string().optional(),
    labelField: z.string().optional(),
    maxLength: z.number().int().positive().optional(),
    requireText: z.boolean().default(false),
  })
  .strict()
export type SheetEntryStandard = z.infer<typeof SheetEntryStandardSchema>

export const SheetEntryTemplateSchema = z
  .object({
    standards: z.array(SheetEntryStandardSchema).default([]),
  })
  .strict()
export type SheetEntryTemplate = z.infer<typeof SheetEntryTemplateSchema>

export function parseSheetEntryTemplate(value: unknown): SheetEntryTemplate | null {
  if (typeof value !== "object" || value === null) return null
  return SheetEntryTemplateSchema.parse(value)
}

export interface SheetEntryViolation {
  readonly standard: string
  readonly entry: string
  readonly rule: "length" | "required"
  readonly message: string
}

function resolveContainer(
  root: unknown,
  path: string
): readonly unknown[] | Record<string, unknown> | undefined {
  let current: unknown = root
  for (const segment of path.split(".")) {
    if (!isRecord(current)) return undefined
    current = current[segment]
  }
  if (Array.isArray(current)) return current
  if (isRecord(current)) return current
  return undefined
}

function textOf(entry: unknown, standard: SheetEntryStandard): string | undefined {
  if (standard.textField === undefined) return typeof entry === "string" ? entry : undefined
  if (!isRecord(entry)) return undefined
  const value = entry[standard.textField]
  return typeof value === "string" ? value : undefined
}

function labelOf(entry: unknown, standard: SheetEntryStandard, fallback: string): string {
  if (standard.labelField !== undefined && isRecord(entry)) {
    const value = entry[standard.labelField]
    if (typeof value === "string" && value.length > 0) return value
  }
  return fallback
}

function* containerEntries(
  container: readonly unknown[] | Record<string, unknown>
): Iterable<readonly [string, unknown]> {
  if (Array.isArray(container)) {
    for (let index = 0; index < container.length; index++) {
      yield [String(index), container[index]]
    }
    return
  }
  for (const [key, value] of Object.entries(container)) {
    yield [key, value]
  }
}

export function validateSheetEntries(
  root: unknown,
  template: SheetEntryTemplate
): readonly SheetEntryViolation[] {
  const violations: SheetEntryViolation[] = []
  for (const standard of template.standards) {
    const container = resolveContainer(root, standard.path)
    if (container === undefined) continue
    for (const [fallbackLabel, entry] of containerEntries(container)) {
      const label = labelOf(entry, standard, fallbackLabel)
      const text = textOf(entry, standard)
      if (standard.requireText && (text === undefined || text.trim().length === 0)) {
        violations.push({
          standard: standard.class,
          entry: label,
          rule: "required",
          message: `${standard.class} "${label}" is missing its required description`,
        })
        continue
      }
      if (
        standard.maxLength !== undefined &&
        text !== undefined &&
        text.length > standard.maxLength
      ) {
        violations.push({
          standard: standard.class,
          entry: label,
          rule: "length",
          message: `${standard.class} "${label}" description is ${text.length} chars, over the ${standard.maxLength} cap`,
        })
      }
    }
  }
  return violations
}

export class SheetEntryTemplateError extends Error {
  readonly violations: readonly SheetEntryViolation[]
  constructor(violations: readonly SheetEntryViolation[]) {
    const body = violations.map((v) => `  - ${v.standard} [${v.rule}]: ${v.message}`).join("\n")
    super(`sheet entries violate the declared template:\n${body}`)
    this.name = "SheetEntryTemplateError"
    this.violations = violations
  }
}

export function assertSheetEntriesConform(root: unknown, template: SheetEntryTemplate): undefined {
  const violations = validateSheetEntries(root, template)
  if (violations.length > 0) throw new SheetEntryTemplateError(violations)
}
