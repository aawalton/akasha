import type { Check } from "./check/check-shape.ts"
import exportDeclaredHere from "./check/export-declared-here/export-declared-here.ts"
import fileLength from "./check/file-length/file-length.ts"
import importReach from "./check/import-reach/import-reach.ts"
import inboundImportResolves from "./check/inbound-import-resolves/inbound-import-resolves.ts"
import pageHoldsToItsType from "./check/page-holds-to-its-type/page-holds-to-its-type.ts"
import pageNamedAsStated from "./check/page-named-as-stated/page-named-as-stated.ts"
import pageNameUnique from "./check/page-name-unique/page-name-unique.ts"
import readBeforeWrite from "./check/read-before-write/read-before-write.ts"
import readWhatIsRequired from "./check/read-what-is-required/read-what-is-required.ts"
import typecheck from "./check/typecheck/typecheck.ts"

export const CHECKS: readonly Check[] = [
  readBeforeWrite,
  readWhatIsRequired,
  fileLength,
  exportDeclaredHere,
  importReach,
  inboundImportResolves,
  pageNameUnique,
  pageNamedAsStated,
  pageHoldsToItsType,
  typecheck,
]
