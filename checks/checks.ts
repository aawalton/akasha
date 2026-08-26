import type { Check } from "./check-shape.ts"
import fileLength from "./check/file-length/file-length.ts"
import importReach from "./check/import-reach/import-reach.ts"
import pageNamedAsStated from "./check/page-named-as-stated/page-named-as-stated.ts"
import pageNameUnique from "./check/page-name-unique/page-name-unique.ts"
import typecheck from "./check/typecheck/typecheck.ts"

export const CHECKS: readonly Check[] = [
  fileLength,
  importReach,
  pageNameUnique,
  pageNamedAsStated,
  typecheck,
]
