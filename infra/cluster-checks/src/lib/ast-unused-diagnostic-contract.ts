import { z } from "zod"
import type { UnusedExportDiagnostic } from "./ts-import-graph-types"

export const AstUnusedDiagnosticContractSchema: z.ZodType<UnusedExportDiagnostic> = z
  .object({
    kind: z.enum(["UnusedExport", "PragmaValidationError"]),
    filePath: z.string(),
    relPath: z.string(),
    line: z.number(),
    exportName: z.string(),
    exportKind: z.enum([
      "function",
      "const",
      "let",
      "var",
      "class",
      "interface",
      "type",
      "enum",
      "namespace",
      "reexport",
      "default",
    ]),
    reason: z.string(),
  })
  .strict()
