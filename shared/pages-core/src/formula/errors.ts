export type FormulaEvaluationErrorCode =
  | "comparison_type_mismatch"
  | "equality_non_scalar"
  | "arithmetic_nan"
  | "divide_by_zero"
  | "bracket_access_type_error"
  | "ref_lookup_type_error"
  | "unknown_function"
  | "function_argument_type_error"

export class FormulaEvaluationError extends Error {
  readonly code: FormulaEvaluationErrorCode
  constructor(code: FormulaEvaluationErrorCode, message: string) {
    super(message)
    this.name = "FormulaEvaluationError"
    this.code = code
  }
}
