import { join } from "node:path"
import {
  type DomainNode,
  type Hung,
  type HungNode,
  hungOnDomains,
} from "akasha/alan/harness/code-editor/data-interface/modules/domain-tree-hanging/domain-tree-hanging.module.code.ts"
import type {
  RefusalTreeRow,
  RefusalTreeState,
} from "akasha/alan/harness/code-editor/data-interface/pages/refusal-tree/refusal-tree.code-editor-data-interface.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

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

export function refusalTreeLine(
  root: string,
  refused: readonly Judged[],
  domains: readonly DomainNode[]
): string {
  const built = hungOnDomains(domains, hungOf(refused))
  return JSON.stringify({
    roots: built.roots.map((node) => refusalRow(root, node)),
    unreached: built.unreached,
  } satisfies RefusalTreeState)
}
