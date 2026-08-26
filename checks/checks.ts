import type { Check } from "./check-shape.ts"
import fileLength from "./check/file-length.ts"
import importReach from "./check/import-reach.ts"
import typecheck from "./check/typecheck.ts"

export const CHECKS: readonly Check[] = [fileLength, importReach, typecheck]
