import { renameSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const INTERFACES_AT = "alan/harness/code-editor/data-interface/pages"
const SCRATCH_AT = "alan/harness/code-editor/data-interface"
const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.json"

export function writeState(root: string, slug: string, line: string): undefined {
  const scratch = join(root, SCRATCH_AT, `${slug}${STATE_TAIL}.${process.pid}.part`)
  writeFileSync(scratch, `${line}\n`, "utf8")
  renameSync(scratch, join(root, INTERFACES_AT, slug, `${slug}${STATE_TAIL}`))
  return undefined
}
