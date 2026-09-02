import { namedIn } from "@akasha/pages-system/page-file-name"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"

export const CEILING = 15000

export const ENTRY_CEILING = 8 * 1024 * 1024

const TEST = "test"

const TS = "ts"

const ENTRIES = "jsonl"

const RELIEF = "a module carries one test, and what sets it up stands beside it in `test-fixtures`"

function testNamed(path: string): boolean {
  const said = namedIn(path)
  return said !== null && said.tail === TEST && said.held === TS
}

function ceilingFor(path: string): number {
  return namedIn(path)?.held === ENTRIES ? ENTRY_CEILING : CEILING
}

export function reasonsIn(given: Body): readonly string[] {
  const held = given.bytes.byteLength
  const ceiling = ceilingFor(given.path)
  if (held <= ceiling) return []
  const over = ceiling.toLocaleString("en-US")
  const said = `${held.toLocaleString("en-US")} bytes, over the ${over} byte ceiling`
  if (!testNamed(given.path)) return [said]
  return [`${said} — ${RELIEF}`]
}

export const fileLength = judgingEach(FILES, reasonsIn)
