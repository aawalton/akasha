import { renameSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  commandTreeLine,
  domainTreeLine,
  pageTreeLine,
} from "akasha/alan/harness/code-editor/data-interfaces/modules/tree-drawing/tree-drawing.module.code.ts"

const INTERFACES_AT = "alan/harness/code-editor/data-interfaces/pages"
const SCRATCH_AT = "alan/harness/code-editor/data-interfaces"
const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.json"
const COMMAND_TREE = "command-tree"
const DOMAIN_TREE = "domain-tree"
const PAGE_TREE = "page-tree"

export function writeState(root: string, slug: string, line: string): undefined {
  const scratch = join(root, SCRATCH_AT, `${slug}${STATE_TAIL}.${process.pid}.part`)
  writeFileSync(scratch, `${line}\n`, "utf8")
  renameSync(scratch, join(root, INTERFACES_AT, slug, `${slug}${STATE_TAIL}`))
  return undefined
}

export function statesLanded(root: string): undefined {
  writeState(root, COMMAND_TREE, commandTreeLine(root))
  writeState(root, DOMAIN_TREE, domainTreeLine(root))
  writeState(root, PAGE_TREE, pageTreeLine(root))
  return undefined
}
