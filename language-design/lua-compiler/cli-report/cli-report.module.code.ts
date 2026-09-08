import * as ts from "typescript"
import { diagnosticSource } from "../utils/utils.module.code.ts"

export const prepareDiagnosticForFormatting = (diagnostic: ts.Diagnostic): ts.Diagnostic =>
  diagnostic.source === diagnosticSource
    ? Object.assign({ ...diagnostic }, { code: "TL" })
    : diagnostic

export function createDiagnosticReporter(pretty: boolean, system = ts.sys): ts.DiagnosticReporter {
  const reporter = ts.createDiagnosticReporter(system, pretty)
  return (diagnostic) => reporter(prepareDiagnosticForFormatting(diagnostic))
}
