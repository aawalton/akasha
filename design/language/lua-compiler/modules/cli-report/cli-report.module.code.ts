import { DIAGNOSTIC_SOURCE } from "akasha/design/language/lua-compiler/modules/utils/utils.module.code.ts"
import * as ts from "typescript"

const prepareDiagnosticForFormatting = (diagnostic: ts.Diagnostic): ts.Diagnostic =>
  diagnostic.source === DIAGNOSTIC_SOURCE
    ? Object.assign({ ...diagnostic }, { code: "TL" })
    : diagnostic

export function createDiagnosticReporter(pretty: boolean, system = ts.sys): ts.DiagnosticReporter {
  const reporter = ts.createDiagnosticReporter(system, pretty)
  return (diagnostic) => reporter(prepareDiagnosticForFormatting(diagnostic))
}
