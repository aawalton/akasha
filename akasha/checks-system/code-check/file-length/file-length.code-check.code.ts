import type { Body } from "../../change-walking/change-walking.module.code.ts"
import { judgingEachFile } from "../../change-walking/change-walking.module.code.ts"

export const CEILING = 15000

const CEILING_SAID = CEILING.toLocaleString("en-US")

export function reasonsIn(given: Body): readonly string[] {
  const held = given.bytes.byteLength
  if (held <= CEILING) return []
  return [`${held.toLocaleString("en-US")} bytes, over the ${CEILING_SAID} byte ceiling`]
}

export const fileLength = judgingEachFile(reasonsIn)
