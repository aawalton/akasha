import { createHash } from "node:crypto"

const DIGEST = "sha256"

const HEX = "hex"

const KEPT = 32

export function astHashOf(rule: string): string {
  return createHash(DIGEST).update(rule).digest(HEX).slice(0, KEPT)
}
