import { joinPath as joinPathPure } from "../../../utils-narrow/src/join-path"
import type { ReadonlyJSONValue } from "../schema/pages"
import { FormulaEvaluationError } from "./errors"

export function contains(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const arr = args[0]
  const needle = args[1]
  if (arr === undefined || arr === null) return null
  if (!Array.isArray(arr)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `contains: array argument must be an array, got ${typeof arr}`
    )
  }
  return arr.some((item) => item === needle)
}

export function containsText(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const haystack = args[0]
  const needle = args[1]
  if (haystack === undefined || haystack === null) return null
  if (needle === undefined || needle === null) return null
  if (typeof haystack !== "string") {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `containsText: haystack must be a string, got ${typeof haystack}`
    )
  }
  if (typeof needle !== "string") {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `containsText: needle must be a string, got ${typeof needle}`
    )
  }
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

export function count(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const arr = args[0]
  if (arr === undefined || arr === null) return 0
  if (!Array.isArray(arr)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `count: argument must be an array, got ${typeof arr}`
    )
  }
  return arr.length
}

export function joinPath(args: readonly ReadonlyJSONValue[]): ReadonlyJSONValue {
  const cardId = args[0]
  const itemPath = args[1]
  if (cardId === undefined || cardId === null) return null
  if (typeof cardId !== "string") {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `joinPath: cardId must be a string, got ${typeof cardId}`
    )
  }
  if (itemPath === undefined || itemPath === null) return joinPathPure(cardId)
  if (!Array.isArray(itemPath)) {
    throw new FormulaEvaluationError(
      "function_argument_type_error",
      `joinPath: itemPath must be an array or null, got ${typeof itemPath}`
    )
  }
  return joinPathPure(cardId, itemPath.map(String))
}
