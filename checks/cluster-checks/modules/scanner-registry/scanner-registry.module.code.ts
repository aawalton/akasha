import {
  componentLayoutHeadStylesEntry,
  componentLayoutJsxEntry,
} from "../check-component-layout/check-component-layout.module.code.ts"
import { exhaustiveDispatchEntry } from "../check-exhaustive-dispatch/check-exhaustive-dispatch.module.code.ts"
import { harnessCredentialScriptTextEntry } from "../check-harness-credential-script-text/check-harness-credential-script-text.module.code.ts"
import { libcFfiBindingEntry } from "../check-libc-ffi-binding/check-libc-ffi-binding.module.code.ts"
import { noVoidReturnEntry } from "../check-no-void-return/check-no-void-return.module.code.ts"
import { objectLiteralSelfEntry } from "../check-object-literal-self/check-object-literal-self.module.code.ts"
import { popoverViewportSafetyEntry } from "../check-popover-viewport-safety/check-popover-viewport-safety.module.code.ts"
import { populationReadSwallowEntry } from "../check-population-read-swallow/check-population-read-swallow.module.code.ts"
import { sopsSpawnPipeEntry } from "../check-sops-spawn-pipe/check-sops-spawn-pipe.module.code.ts"
import { timezoneHandlingEntry } from "../check-timezone-handling/check-timezone-handling.module.code.ts"
import type { SyntaxScannerEntry } from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"

export const SYNTAX_SCANNER_ENTRIES: readonly SyntaxScannerEntry[] = [
  noVoidReturnEntry,
  exhaustiveDispatchEntry,
  timezoneHandlingEntry,
  sopsSpawnPipeEntry,
  harnessCredentialScriptTextEntry,
  libcFfiBindingEntry,
  objectLiteralSelfEntry,
  populationReadSwallowEntry,
  componentLayoutJsxEntry,
  componentLayoutHeadStylesEntry,
  popoverViewportSafetyEntry,
]
