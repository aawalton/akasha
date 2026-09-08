import {
  componentLayoutHeadStylesEntry,
  componentLayoutJsxEntry,
} from "../check-component-layout/check-component-layout.module.code.ts"
import { objectLiteralSelfEntry } from "../check-object-literal-self/check-object-literal-self.module.code.ts"
import { popoverViewportSafetyEntry } from "../check-popover-viewport-safety/check-popover-viewport-safety.module.code.ts"
import { populationReadSwallowEntry } from "../check-population-read-swallow/check-population-read-swallow.module.code.ts"
import type { SyntaxScannerEntry } from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"

export const SYNTAX_SCANNER_ENTRIES: readonly SyntaxScannerEntry[] = [
  objectLiteralSelfEntry,
  populationReadSwallowEntry,
  componentLayoutJsxEntry,
  componentLayoutHeadStylesEntry,
  popoverViewportSafetyEntry,
]
