import type { z } from "zod"

export interface SchemaViolation {
  readonly field: string
  readonly message: string
}

export function toViolations(error: z.ZodError): readonly SchemaViolation[] {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "(root)",
    message: issue.message,
  }))
}
