import { join } from "node:path"
import {
  domainsIn,
  type Hung,
  type HungNode,
  hungOnDomains,
} from "akasha/alan/harness/code-editor/data-interface/modules/domain-tree-hanging/domain-tree-hanging.module.code.ts"
import {
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  type RefusalTreeRow,
  type RefusalTreeState,
  refusalTreeStateSchema,
} from "akasha/alan/harness/code-editor/data-interface/pages/refusal-tree/refusal-tree.code-editor-data-interface.code.ts"
import { definitionIsWrittenInTheGrammar } from "akasha/check/code/pages/definition-is-written-in-the-grammar/definition-is-written-in-the-grammar.check-code.audit.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const SLUG = "refusal-tree"

const KEYED = "refusal/"

function hungOf(refused: readonly Judged[]): readonly Hung[] {
  return refused.map((one) => {
    const parted = partedIn(one.path)
    const domain = parted === null ? one.path : `${parted.pageType}/${parted.slug}`
    return { key: `${KEYED}${one.path}`, label: one.reason, at: one.path, domain }
  })
}

function refusalRow(root: string, node: HungNode): RefusalTreeRow {
  return {
    key: node.key,
    label: node.label,
    at: node.at === null ? null : join(root, node.at),
    color: null,
    refusals: node.count,
    children: node.children.map((child) => refusalRow(root, child)),
  }
}

export function refusalTreeLine(root: string): string {
  const built = hungOnDomains(domainsIn(root), hungOf(definitionIsWrittenInTheGrammar(root)))
  return JSON.stringify({
    roots: built.roots.map((node) => refusalRow(root, node)),
    unreached: built.unreached,
  } satisfies RefusalTreeState)
}

export function refusalCountIn(root: string): number {
  const drawn = readState(stateAt(root, SLUG), refusalTreeStateSchema)
  if (drawn === null) return definitionIsWrittenInTheGrammar(root).length
  return drawn.roots.reduce((total, one) => total + one.refusals, 0)
}
