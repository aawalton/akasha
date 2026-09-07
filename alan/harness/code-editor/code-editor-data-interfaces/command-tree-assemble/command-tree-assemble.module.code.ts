import { domainRowsIn } from "../../../../../command-system/commands/domain-tree/domain-tree.command.code.ts"
import { championTree } from "../../../../../editor-extension/champions-tree/champions-tree.module.code.ts"
import { partedIn } from "../../../../../pages/file-name/page-file-name.module.code.ts"
import {
  readingIn,
  typeSlugById,
  valuesOfType,
} from "../../../../../pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "../../../../../pages/value/page-value.module.code.ts"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"
const NAMESPACE_TYPE = "01a06c7c-54b5-712b-b4a2-9ada10279dff"
const COMMAND_ROOT = "page-type/command"
const COMMAND = "command/"
const NAMESPACE = "namespace/"
const DEFINITION = "definition"
const UNDER = "-"

export type CommandNode = {
  readonly key: string
  readonly label: string
  readonly called: string
  readonly kind: "namespace" | "command"
  readonly at: string | null
  readonly detail: string | null
  readonly children: readonly CommandNode[]
}

export type CommandTree = {
  readonly roots: readonly CommandNode[]
  readonly unreached: readonly string[]
}

type Node = {
  readonly slug: string
  readonly relPath: string | null
  readonly children: readonly Node[]
}

function definitionsOf(root: string): ReadonlyMap<string, string> {
  const reading = readingIn(root)
  const found = new Map<string, string>()
  for (const id of [COMMAND_TYPE, NAMESPACE_TYPE]) {
    const filed = typeSlugById(reading, id)
    if (filed === null) continue
    for (const one of valuesOfType(reading, filed)) {
      const said = partedIn(one.path)
      if (said === null || said.sections.length > 0) continue
      const definition = textAt(one.value, DEFINITION)
      if (definition !== null) found.set(`${said.pageType}/${said.slug}`, definition)
    }
  }
  return found
}

function wanted(node: Node): boolean {
  return node.slug.startsWith(COMMAND) || node.slug.startsWith(NAMESPACE)
}

function commandRoot(nodes: readonly Node[]): Node | null {
  for (const node of nodes) {
    if (node.slug === COMMAND_ROOT) return node
    const found = commandRoot(node.children)
    if (found !== null) return found
  }
  return null
}

function labelOf(called: string, above: string): string {
  const opening = `${above}${UNDER}`
  return above !== "" && called.startsWith(opening) ? called.slice(opening.length) : called
}

function commandNode(
  node: Node,
  above: string,
  definitions: ReadonlyMap<string, string>,
  reached: Set<string>
): CommandNode {
  reached.add(node.slug)
  const called = node.slug.slice(node.slug.indexOf("/") + 1)
  return {
    key: node.slug,
    label: labelOf(called, above),
    called,
    kind: node.slug.startsWith(NAMESPACE) ? "namespace" : "command",
    at: node.relPath,
    detail: definitions.get(node.slug) ?? null,
    children: node.children
      .filter(wanted)
      .map((child) => commandNode(child, called, definitions, reached)),
  }
}

export function assembleCommandTree(root: string): CommandTree {
  const rows = domainRowsIn(root)
  const under = commandRoot(championTree(rows).roots)
  const definitions = definitionsOf(root)
  const reached = new Set<string>()
  const roots =
    under === null
      ? []
      : under.children.filter(wanted).map((child) => commandNode(child, "", definitions, reached))
  const unreached = rows
    .map((one) => one.slug)
    .filter(
      (slug) => (slug.startsWith(COMMAND) || slug.startsWith(NAMESPACE)) && !reached.has(slug)
    )
    .sort()
  return { roots, unreached }
}
