import { namedIn } from "@akasha/pages-system/page-file-name"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"

export const CEILING = 15000

const CEILING_SAID = CEILING.toLocaleString("en-US")

const TEST = "test"

const TS = "ts"

const RELIEF = "a module carries one test, and what sets it up stands beside it in `test-fixtures`"

function testNamed(path: string): boolean {
  const said = namedIn(path)
  return said !== null && said.tail === TEST && said.held === TS
}

export function reasonsIn(given: Body): readonly string[] {
  const held = given.bytes.byteLength
  if (held <= CEILING) return []
  const said = `${held.toLocaleString("en-US")} bytes, over the ${CEILING_SAID} byte ceiling`
  if (!testNamed(given.path)) return [said]
  return [`${said} — ${RELIEF}`]
}

export const fileLength = judgingEach(FILES, reasonsIn)
