import { join } from "node:path"
import {
  domainsIn,
  type Hung,
  type HungNode,
  hungOnDomains,
} from "akasha/alan/harness/code-editor/data-interface/modules/domain-tree-hanging/domain-tree-hanging.module.code.ts"
import { writeState } from "akasha/alan/harness/code-editor/data-interface/modules/state-writing/state-writing.module.code.ts"
import { definitionIsWrittenInTheGrammar } from "akasha/check/code/pages/definition-is-written-in-the-grammar/definition-is-written-in-the-grammar.check-code.audit.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import "akasha/alan/harness/code-editor/data-interface/pages/refusal-tree/refusal-tree.code-editor-data-interface.d.ts"

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

export function refusalsDrawn(root: string): number {
  const refused = definitionIsWrittenInTheGrammar(root)
  const built = hungOnDomains(domainsIn(root), hungOf(refused))
  const line = JSON.stringify({
    roots: built.roots.map((node) => refusalRow(root, node)),
    unreached: built.unreached,
  } satisfies RefusalTreeState)
  writeState(root, SLUG, line)
  return refused.length
}
