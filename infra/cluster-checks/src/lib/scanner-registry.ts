import { boundaryParseEntry } from "../checks/check-boundary-parse.ts"
import {
  componentLayoutHeadStylesEntry,
  componentLayoutJsxEntry,
} from "../checks/check-component-layout.ts"
import { exhaustiveDispatchEntry } from "../checks/check-exhaustive-dispatch.ts"
import { harnessCredentialScriptTextEntry } from "../checks/check-harness-credential-script-text.ts"
import { libSetsPerPieceDifficultyBoundaryEntry } from "../checks/check-lib-sets-per-piece-difficulty-boundary.ts"
import { libcFfiBindingEntry } from "../checks/check-libc-ffi-binding.ts"
import { noVoidReturnEntry } from "../checks/check-no-void-return.ts"
import { popoverViewportSafetyEntry } from "../checks/check-popover-viewport-safety.ts"
import { populationReadSwallowEntry } from "../checks/check-population-read-swallow.ts"
import { readonlyCollectionsEntry } from "../checks/check-readonly-collections.ts"
import { sopsSpawnPipeEntry } from "../checks/check-sops-spawn-pipe.ts"
import { suspenseThrowSettlesEntry } from "../checks/check-suspense-throw-settles.ts"
import { timezoneHandlingEntry } from "../checks/check-timezone-handling.ts"
import { tstlObjectLiteralSelfEntry } from "../checks/check-tstl-object-literal-self.ts"
import { tstlPropertyCallbackSelfEntry } from "../checks/check-tstl-property-callback-self.ts"
import { typeAssertionsEntry } from "../checks/check-type-assertions.ts"
import type { SyntaxScannerEntry } from "./syntax-scanner-entry.ts"

export const SYNTAX_SCANNER_ENTRIES: readonly SyntaxScannerEntry[] = [
  typeAssertionsEntry,
  noVoidReturnEntry,
  readonlyCollectionsEntry,
  exhaustiveDispatchEntry,
  boundaryParseEntry,
  timezoneHandlingEntry,
  sopsSpawnPipeEntry,
  harnessCredentialScriptTextEntry,
  libcFfiBindingEntry,
  suspenseThrowSettlesEntry,
  tstlObjectLiteralSelfEntry,
  tstlPropertyCallbackSelfEntry,
  populationReadSwallowEntry,
  libSetsPerPieceDifficultyBoundaryEntry,
  componentLayoutJsxEntry,
  componentLayoutHeadStylesEntry,
  popoverViewportSafetyEntry,
]
