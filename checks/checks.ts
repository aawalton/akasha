import type { Check } from "./check-shape.ts"
import fileLength from "./check/file-length.ts"

export const CHECKS: readonly Check[] = [fileLength]
