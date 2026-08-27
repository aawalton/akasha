import type { VerdictFinding } from "../../../../tools/lib/verdict-channel"
import { z } from "zod"

export const BiomeDiagnosticSchema = z
  .object({
    severity: z.string(),
    category: z.string().nullish(),
    message: z.unknown().optional(),
    location: z
      .object({
        path: z.string().nullish(),
        start: z
          .object({
            line: z.number().int().nonnegative(),
            column: z.number().int().nonnegative(),
          })
          .passthrough()
          .nullish(),
      })
      .passthrough()
      .nullish(),
  })
  .passthrough()

export type BiomeDiagnostic = z.infer<typeof BiomeDiagnosticSchema>

const WHITESPACE_RUN = /\s+/g

function messageText(message: unknown): string | null {
  if (typeof message !== "string") return null
  const folded = message.replace(WHITESPACE_RUN, " ").trim()
  return folded === "" ? null : folded
}

export function diagnosticAt(diagnostic: BiomeDiagnostic): string | null {
  const path = diagnostic.location?.path
  if (typeof path !== "string" || path === "") return null
  const start = diagnostic.location?.start
  if (start == null || start.line === 0) return path
  return `${path}:${start.line}:${start.column}`
}

export function diagnosticDetail(diagnostic: BiomeDiagnostic): string {
  const category = diagnostic.category ?? "uncategorized"
  const message = messageText(diagnostic.message)
  return message === null ? category : `${category} — ${message}`
}

export function lintDiagnosticFindings(
  diagnostics: readonly BiomeDiagnostic[]
): readonly VerdictFinding[] {
  return diagnostics
    .filter((diagnostic) => diagnostic.severity === "error")
    .map((diagnostic) => ({ detail: diagnosticDetail(diagnostic), at: diagnosticAt(diagnostic) }))
}
