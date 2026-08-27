import { assertNever } from "../../../utils-narrow/src/assert-never"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import type { ReadonlyJSONValue } from "../schema/pages"
import { FormulaEvaluationError } from "./errors"
import { formulaFunctions } from "./functions"
import type { FormulaNode } from "./parser"
import { isTruthy } from "./truthiness"


function isJsonObject(
  value: ReadonlyJSONValue
): value is { readonly [k: string]: ReadonlyJSONValue } {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function lookupRef(
  path: readonly string[],
  values: Record<string, ReadonlyJSONValue | undefined>
): ReadonlyJSONValue {
  if (path.length === 0) return null
  let current: ReadonlyJSONValue = values[requireFirst(path)] ?? null
  for (let i = 1; i < path.length; i++) {
    if (current === null) return null
    if (!isJsonObject(current)) {
      throw new FormulaEvaluationError(
        "ref_lookup_type_error",
        `Cannot read '${path.slice(i).join(".")}' on non-object segment '${path.slice(0, i).join(".")}'`
      )
    }
    const segment = path[i]
    if (segment === undefined) return null
    current = current[segment] ?? null
  }
  return current
}

function isScalar(v: ReadonlyJSONValue): boolean {
  return v === null || typeof v === "number" || typeof v === "string" || typeof v === "boolean"
}

function describe(v: ReadonlyJSONValue): string {
  if (v === null) return "null"
  if (typeof v === "string") return `string '${v.slice(0, 20)}${v.length > 20 ? "…" : ""}'`
  if (Array.isArray(v)) return "array"
  if (typeof v === "object") return "object"
  return `${typeof v} ${String(v)}`
}

function applyArithmetic(
  op: "+" | "-" | "*" | "/" | "%",
  left: ReadonlyJSONValue,
  right: ReadonlyJSONValue
): ReadonlyJSONValue {
  const ln = Number(left)
  const rn = Number(right)
  if (Number.isNaN(ln)) {
    throw new FormulaEvaluationError(
      "arithmetic_nan",
      `Cannot apply '${op}' to ${describe(left)} (left operand coerces to NaN)`
    )
  }
  if (Number.isNaN(rn)) {
    throw new FormulaEvaluationError(
      "arithmetic_nan",
      `Cannot apply '${op}' to ${describe(right)} (right operand coerces to NaN)`
    )
  }
  switch (op) {
    case "+":
      return ln + rn
    case "-":
      return ln - rn
    case "*":
      return ln * rn
    case "/":
      if (rn === 0) throw new FormulaEvaluationError("divide_by_zero", "Division by zero")
      return ln / rn
    case "%":
      if (rn === 0) throw new FormulaEvaluationError("divide_by_zero", "Modulo by zero")
      return ln % rn
    default:
      assertNever(op)
  }
}

export function evaluateFormula(
  node: FormulaNode,
  values: Record<string, ReadonlyJSONValue | undefined>
): ReadonlyJSONValue {
  switch (node.type) {
    case "number":
      return node.value

    case "string":
      return node.value

    case "boolean":
      return node.value

    case "null":
      return null

    case "prop":
      return values[node.id] ?? null

    case "ref":
      return lookupRef(node.path, values)

    case "unary_minus": {
      const operand = evaluateFormula(node.operand, values)
      const n = Number(operand)
      if (Number.isNaN(n)) {
        throw new FormulaEvaluationError(
          "arithmetic_nan",
          `Cannot negate ${describe(operand)} (operand coerces to NaN)`
        )
      }
      return -n
    }

    case "unary_not": {
      const operand = evaluateFormula(node.operand, values)
      return !isTruthy(operand)
    }

    case "call": {
      const fn = formulaFunctions.get(node.name)
      if (!fn) {
        throw new FormulaEvaluationError("unknown_function", `Unknown function '${node.name}'`)
      }
      const args = node.args.map((arg) => evaluateFormula(arg, values))
      return fn.call(args)
    }

    case "array":
      return node.elements.map((el) => evaluateFormula(el, values))

    case "bracket_access": {
      const obj = evaluateFormula(node.obj, values)
      const key = evaluateFormula(node.key, values)
      if (obj === null || key === null) return null
      if (!isJsonObject(obj)) {
        throw new FormulaEvaluationError(
          "bracket_access_type_error",
          `Cannot bracket-access ${describe(obj)} (left side is not an object)`
        )
      }
      if (typeof key !== "string") {
        throw new FormulaEvaluationError(
          "bracket_access_type_error",
          `Cannot bracket-access with ${describe(key)} (key is not a string)`
        )
      }
      return obj[key] ?? null
    }

    case "binary": {
      if (node.op === "&&") {
        const left = evaluateFormula(node.left, values)
        if (!isTruthy(left)) return left
        return evaluateFormula(node.right, values)
      }
      if (node.op === "||") {
        const left = evaluateFormula(node.left, values)
        if (isTruthy(left)) return left
        return evaluateFormula(node.right, values)
      }

      const left = evaluateFormula(node.left, values)
      const right = evaluateFormula(node.right, values)

      if (node.op === "==" || node.op === "!=") {
        if (!isScalar(left)) {
          throw new FormulaEvaluationError(
            "equality_non_scalar",
            `Cannot compare ${describe(left)} with '${node.op}' — only scalars (number/string/boolean/null) compare`
          )
        }
        if (!isScalar(right)) {
          throw new FormulaEvaluationError(
            "equality_non_scalar",
            `Cannot compare ${describe(right)} with '${node.op}' — only scalars (number/string/boolean/null) compare`
          )
        }
        const eq = left === right
        return node.op === "==" ? eq : !eq
      }

      if (node.op === "<" || node.op === ">" || node.op === "<=" || node.op === ">=") {
        if (left === null || right === null) return null
        if (typeof left !== "number" || !Number.isFinite(left)) {
          throw new FormulaEvaluationError(
            "comparison_type_mismatch",
            `Cannot compare ${describe(left)} with '${node.op}' — both sides must be finite numbers`
          )
        }
        if (typeof right !== "number" || !Number.isFinite(right)) {
          throw new FormulaEvaluationError(
            "comparison_type_mismatch",
            `Cannot compare ${describe(right)} with '${node.op}' — both sides must be finite numbers`
          )
        }
        switch (node.op) {
          case "<":
            return left < right
          case ">":
            return left > right
          case "<=":
            return left <= right
          case ">=":
            return left >= right
          default:
            assertNever(node.op)
        }
      }

      if (node.op === "+" && (typeof left === "string" || typeof right === "string")) {
        return String(left ?? "") + String(right ?? "")
      }

      return applyArithmetic(node.op, left, right)
    }

    default:
      assertNever(node)
  }
}
