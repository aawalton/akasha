import { requireGet } from "../../../utils-narrow/src/require-get.ts"
import type { PageDataJSON, PropertyDefinition } from "../types.ts"
import type { ReadonlyJSONValue } from "../schema/pages.ts"
import { evaluateFormula } from "./evaluate.ts"
import { FormulaEvaluationError, type FormulaEvaluationErrorCode } from "./errors.ts"
import { parseExpression } from "./parser.ts"
import { FormulaParseError } from "./lexer.ts"

export type FormulaErrorCode = FormulaEvaluationErrorCode | "parse_error"

interface FormulaError {
  readonly __formulaError: string
  readonly code: FormulaErrorCode
  readonly [key: string]: ReadonlyJSONValue
}

function isExpressionConfig(
  value: ReadonlyJSONValue | Readonly<Record<string, ReadonlyJSONValue>> | undefined
): value is { readonly expression: string } {
  if (value == null || typeof value !== "object" || Array.isArray(value)) return false
  if (!("expression" in value)) return false
  return typeof value.expression === "string"
}

type ComputedDefinition = PropertyDefinition & {
  readonly config: { readonly expression: string }
}

function isComputed(definition: PropertyDefinition): definition is ComputedDefinition {
  return isExpressionConfig(definition.config)
}

const NOW_INPUT_KEY = "now"

export function isLiveFormulaConfig(
  config: ReadonlyJSONValue | Readonly<Record<string, ReadonlyJSONValue>> | undefined
): boolean {
  if (config == null || typeof config !== "object" || Array.isArray(config)) return false
  if (!("live" in config)) return false
  return config.live === true
}

export function resolveComputedProperties(
  data: PageDataJSON,
  definitions: readonly PropertyDefinition[],
  opts?: { readonly now?: number }
): PageDataJSON {
  const formulaDefs = definitions.filter(isComputed)
  if (formulaDefs.length === 0) return data

  const nowValue = opts?.now ?? 0

  const resolvedCache = new Map<string, ReadonlyJSONValue>()

  function resolveOne(propId: string, visiting: Set<string>): ReadonlyJSONValue {
    if (resolvedCache.has(propId)) return requireGet(resolvedCache, propId, "resolvedCache")

    if (visiting.has(propId)) return null

    const def = formulaDefs.find((d) => d.id === propId)
    if (!def) {
      return data[propId] ?? null
    }

    visiting.add(propId)

    try {
      const ast = parseExpression(def.config.expression)

      const target: Record<string, ReadonlyJSONValue> = Object.create(null)
      const values = new Proxy(target, {
        get(_target, key: string) {
          if (key === NOW_INPUT_KEY) return nowValue
          const refDef = formulaDefs.find((d) => d.id === key)
          if (refDef) {
            return resolveOne(key, new Set(visiting))
          }
          return data[key] ?? null
        },
      })

      const result = evaluateFormula(ast, values)
      resolvedCache.set(propId, result)
      return result
    } catch (err) {
      const errorVal: FormulaError =
        err instanceof FormulaEvaluationError
          ? { __formulaError: err.message, code: err.code }
          : err instanceof FormulaParseError
            ? { __formulaError: err.message, code: "parse_error" }
            : { __formulaError: "Evaluation error", code: "parse_error" }
      resolvedCache.set(propId, errorVal)
      return errorVal
    }
  }

  for (const def of formulaDefs) {
    resolveOne(def.id, new Set())
  }

  const enriched: Record<string, ReadonlyJSONValue> = {}
  for (const k of Object.keys(data)) enriched[k] = data[k] ?? null
  for (const [key, value] of resolvedCache) enriched[key] = value
  return enriched
}

export { isComputed }
