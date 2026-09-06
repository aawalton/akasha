// THE THREE TREES THE EDITOR DRAWS, BUILT HERE RATHER THAN ON THE THREAD THAT DRAWS THEM.
//
// Each tree already had a builder that holds no editor in it, so none of the working out is
// written again here: what this adds is the one name every row of every tree carries. Four panels
// each named a row of their own and no two agreed, so a reader had to know which tree it held
// before it could read a field off a row.
//
// Measured on this checkout, from a service rather than the editor: the work tree is 15 roots in
// 14ms, the domains tree is 10,898 rows over 7 levels in 335ms, and the editor paid the domains
// one on its own thread, inside a second's budget.

import { join } from "node:path"
import { domainRowsIn } from "../../../../../command-system/commands/domain-tree/domain-tree.command.code.ts"
import { pageAnswers } from "../../../../../command-system/commands/page-tree/page-tree.command.code.ts"
import { treeIn } from "../../../../../command-system/commands/work-tree/work-tree.command.code.ts"
import { championTree } from "../../../../../editor-extension/champions-tree/champions-tree.module.code.ts"
import { assemblePageTree } from "../../../../../editor-extension/page-tree-assemble/page-tree-assemble.module.code.ts"

// A row names a document by a whole path, the service knowing the checkout so the editor does not
// join one. A row that opens no document names none.
function wholePath(root: string, at: string | null | undefined): string | null {
  if (at === undefined || at === null || at === "") return null
  return at.startsWith("/") ? at : join(root, at)
}

// The pages tree spells a document as `<checkout>:<path inside it>`, which is two facts in one
// string. The checkout is already known, so only the path is carried on.
function pathAfterRepo(root: string, at: string | null): string | null {
  if (at === null) return null
  const mark = at.indexOf(":")
  return wholePath(root, mark === -1 ? at : at.slice(mark + 1))
}

// WHAT A WORK ROW IS HAS TO BE CARRIED ACROSS, because the work tree holds rows of two kinds and
// the panel counts one kind apart from the other. The builder's node is read through this shape
// rather than imported, so a field the builder adds is dropped here unless it is named here too.
type WorkNode = {
  readonly kind: WorkTreeRow["kind"]
  readonly key: string
  readonly label: string
  readonly relPath: string | null
  readonly detail: string | null
  readonly note: string | null
  readonly color: string | null
  readonly children: readonly WorkNode[]
}

function workRow(root: string, node: WorkNode): WorkTreeRow {
  return {
    kind: node.kind,
    key: node.key,
    label: node.label,
    at: wholePath(root, node.relPath),
    color: node.color,
    detail: node.detail,
    note: node.note,
    children: node.children.map((child) => workRow(root, child)),
  }
}

export function workTreeLine(root: string): string {
  const roots = treeIn(root).map((node) => workRow(root, node as WorkNode))
  return JSON.stringify({ roots } satisfies WorkTreeState)
}

type DomainNode = {
  readonly slug: string
  readonly relPath: string | null
  readonly persona: string | null
  readonly position: number | null
  readonly children: readonly DomainNode[]
}

function domainRow(root: string, node: DomainNode): DomainTreeRow {
  return {
    key: node.slug,
    label: node.slug,
    at: wholePath(root, node.relPath),
    color: null,
    persona: node.persona,
    position: node.position,
    children: node.children.map((child) => domainRow(root, child)),
  }
}

export function domainTreeLine(root: string): string {
  const built = championTree(domainRowsIn(root))
  return JSON.stringify({
    roots: built.roots.map((node) => domainRow(root, node as DomainNode)),
    unreached: built.unreached,
  } satisfies DomainTreeState)
}

type PageNode = {
  readonly id: string
  readonly label: string
  readonly at: string | null
  readonly detail: string | null
  readonly children: readonly PageNode[]
}

function pageRow(root: string, node: PageNode): PageTreeRow {
  return {
    key: node.id,
    label: node.label,
    at: pathAfterRepo(root, node.at),
    color: null,
    detail: node.detail,
    children: node.children.map((child) => pageRow(root, child)),
  }
}

export function pageTreeLine(root: string): string {
  const built = assemblePageTree(pageAnswers(root), root)
  return JSON.stringify({
    roots: built.roots.map((node) => pageRow(root, node as PageNode)),
    unreached: built.unreached,
  } satisfies PageTreeState)
}
