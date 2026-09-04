import type { ErrorReport } from "../error-report/error-report.module.code.ts"
import { normalizeStack } from "../stack-normalizing/stack-normalizing.module.code.ts"

export function computeFingerprint(report: ErrorReport): string {
  const input = `${normalizeStack(report.stack)}\n${report.message}\n${report.app}`
  return fnv1a64Hex(input)
}

const FNV_OFFSET_BASIS = 0xcbf29ce484222325n
const FNV_PRIME = 0x100000001b3n
const MASK_64 = 0xffffffffffffffffn

function fnv1a64Hex(input: string): string {
  let hash = FNV_OFFSET_BASIS
  for (let i = 0; i < input.length; i++) {
    hash ^= BigInt(input.charCodeAt(i))
    hash = (hash * FNV_PRIME) & MASK_64
  }
  return hash.toString(16).padStart(16, "0")
}
