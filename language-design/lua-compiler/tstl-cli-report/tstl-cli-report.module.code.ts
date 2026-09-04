import * as ts from "typescript"

export const prepareDiagnosticForFormatting = (diagnostic: ts.Diagnostic): ts.Diagnostic =>
  diagnostic.source === "@temper/shared-build-deploy-tstl"
    ? Object.assign({ ...diagnostic }, { code: "TL" })
    : diagnostic

export function createDiagnosticReporter(pretty: boolean, system = ts.sys): ts.DiagnosticReporter {
  const reporter = ts.createDiagnosticReporter(system, pretty)
  return (diagnostic) => reporter(prepareDiagnosticForFormatting(diagnostic))
}
