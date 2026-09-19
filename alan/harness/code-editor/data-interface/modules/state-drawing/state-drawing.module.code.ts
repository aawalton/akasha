import { join } from "node:path"
import { assembleCommandTree } from "akasha/alan/harness/code-editor/data-interface/modules/command-tree-assemble/command-tree-assemble.module.code.ts"
import { keptFor } from "akasha/alan/harness/code-editor/data-interface/modules/domain-row-filing/domain-row-filing.module.code.ts"
import type { HungNode } from "akasha/alan/harness/code-editor/data-interface/modules/domain-tree-hanging/domain-tree-hanging.module.code.ts"
import { assembleFindingTree } from "akasha/alan/harness/code-editor/data-interface/modules/finding-tree-assemble/finding-tree-assemble.module.code.ts"
import { gapsKept } from "akasha/alan/harness/code-editor/data-interface/modules/gap-row-filing/gap-row-filing.module.code.ts"
import {
  assembleGapTree,
  type Gapped,
} from "akasha/alan/harness/code-editor/data-interface/modules/gap-tree-assemble/gap-tree-assemble.module.code.ts"
import { assemblePageTree } from "akasha/alan/harness/code-editor/data-interface/modules/page-tree-assemble/page-tree-assemble.module.code.ts"
import {
  COMMAND_TREE,
  DOMAIN_TREE,
  descentMoved,
  FINDING_TREE,
  GAP_TREE,
  PAGE_TREE,
  turnedIn,
} from "akasha/alan/harness/code-editor/data-interface/modules/tree-turning/tree-turning.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import {
  championTree,
  type DomainRow,
} from "akasha/code/editor/extension/modules/champions-tree/champions-tree.module.code.ts"
import { diskAt } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { pageAnswers } from "akasha/command/pages/page/tree/page-tree.command.code.ts"
import { domainsFrom, rowsFrom } from "akasha/domain/modules/rows/domain-rows.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

const INTERFACES_AT = "alan/harness/code-editor/data-interface/pages"

const STATE_TAIL = ".code-editor-data-interface.state.uncommitted.json"

const INTERFACE_TYPE = "code-editor-data-interface"

const NOT_DRAWN = "the editor's pictures of the pages were not drawn —"

export function wholePath(root: string, at: string | null | undefined): string | null {
  if (at === undefined || at === null || at === "") return null
  return at.startsWith("/") ? at : join(root, at)
}

function pathAfterRepo(root: string, at: string | null): string | null {
  if (at === null) return null
  const mark = at.indexOf(":")
  return wholePath(root, mark === -1 ? at : at.slice(mark + 1))
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

function domainTreeLine(root: string, domains: readonly DomainRow[]): string {
  const built = championTree(domains)
  return JSON.stringify({
    roots: built.roots.map((node) => domainRow(root, node as DomainNode)),
    unreached: built.unreached,
  } satisfies DomainTreeState)
}

function findingRow(root: string, node: HungNode): FindingTreeRow {
  return {
    key: node.key,
    label: node.label,
    at: wholePath(root, node.at),
    color: null,
    findings: node.count,
    children: node.children.map((child) => findingRow(root, child)),
  }
}

function findingTreeLine(root: string, given: Reading, domains: readonly DomainRow[]): string {
  const built = assembleFindingTree(given, domains)
  return JSON.stringify({
    roots: built.roots.map((node) => findingRow(root, node)),
    unreached: built.unreached,
  } satisfies FindingTreeState)
}

function gapRow(root: string, node: HungNode): GapTreeRow {
  return {
    key: node.key,
    label: node.label,
    at: wholePath(root, node.at),
    color: null,
    gaps: node.count,
    children: node.children.map((child) => gapRow(root, child)),
  }
}

function gapTreeLine(
  root: string,
  given: Reading,
  domains: readonly DomainRow[],
  gaps: readonly Gapped[]
): string {
  const built = assembleGapTree(given, domains, gaps)
  return JSON.stringify({
    roots: built.roots.map((node) => gapRow(root, node)),
    unreached: built.unreached,
  } satisfies GapTreeState)
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

function pageTreeLine(root: string, given: Reading): string {
  const built = assemblePageTree(pageAnswers(given), root)
  return JSON.stringify({
    roots: built.roots.map((node) => pageRow(root, node as PageNode)),
    unreached: built.unreached,
  } satisfies PageTreeState)
}

type CommandNode = {
  readonly key: string
  readonly label: string
  readonly called: string
  readonly kind: CommandTreeRow["kind"]
  readonly at: string | null
  readonly detail: string | null
  readonly children: readonly CommandNode[]
}

function commandRow(root: string, node: CommandNode): CommandTreeRow {
  return {
    key: node.key,
    label: node.label,
    at: wholePath(root, node.at),
    color: null,
    kind: node.kind,
    called: node.called,
    detail: node.detail,
    children: node.children.map((child) => commandRow(root, child)),
  }
}

function commandTreeLine(root: string, given: Reading, domains: readonly DomainRow[]): string {
  const built = assembleCommandTree(given, domains)
  const under = built.roots.map((node) => commandRow(root, node))
  const roots: readonly CommandTreeRow[] = [
    {
      kind: "root",
      key: "root",
      label: "commands",
      called: "akasha",
      at: null,
      color: null,
      detail: null,
      children: under,
    },
  ]
  return JSON.stringify({ roots, unreached: built.unreached } satisfies CommandTreeState)
}

export type Drawn = {
  readonly edits: readonly FileChange[]
  readonly said: readonly string[]
}

const NOTHING_DRAWN: Drawn = { edits: [], said: [] }

export function stateAt(slug: string): string {
  return `${INTERFACES_AT}/${slug}/${slug}${STATE_TAIL}`
}

export function drawnFor(change: Change): Drawn {
  try {
    const turned = turnedIn(change)
    if (turned.size === 0) return NOTHING_DRAWN
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_DRAWN
    const root = change.root
    const reading = cast.reading
    const kept = keptFor(change, reading, descentMoved(change))
    const domains = rowsFrom(domainsFrom(kept.rows, reading))
    const gapped = turned.has(GAP_TREE) ? gapsKept(change, reading) : null
    const edits: FileChange[] = [...kept.edits, ...(gapped?.edits ?? [])]
    const drawers: readonly (readonly [string, () => string])[] = [
      [COMMAND_TREE, () => commandTreeLine(root, reading, domains)],
      [DOMAIN_TREE, () => domainTreeLine(root, domains)],
      [FINDING_TREE, () => findingTreeLine(root, reading, domains)],
      [GAP_TREE, () => gapTreeLine(root, reading, domains, gapped?.gaps ?? [])],
      [PAGE_TREE, () => pageTreeLine(root, reading)],
    ]
    for (const [slug, drawing] of drawers) {
      if (!turned.has(slug)) continue
      if (listedAt(reading, INTERFACE_TYPE, slug).length === 0) continue
      const path = stateAt(slug)
      const body = `${drawing()}\n`
      const was = textOf(diskAt(root, path))
      if (was === body) continue
      edits.push(
        was === null
          ? { kind: "add", path, content: body }
          : { kind: "replace", path, contentFrom: was, contentTo: body }
      )
    }
    return { edits, said: [] }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { edits: [], said: [`${NOT_DRAWN} ${why}`] }
  }
}
