import * as path from "node:path"
import { commandPath, runCommand } from "../harness-call/harness-call.module.code.ts"
import { rollUp } from "../work-tree-colors/work-tree-colors.module.code.ts"
import type {
  WorkColors,
  WorkNode,
  WorkTree,
} from "../work-tree-rows/work-tree-rows.module.code.ts"

const COMMAND = "work-tree"

const CALL_TIMEOUT_MS = 60_000

const MAX_BUFFER = 16 * 1024 * 1024

export function countRows(nodes: readonly WorkNode[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function workKeys(nodes: readonly WorkNode[]): readonly string[] {
  return nodes.flatMap((node) => [node.key, ...workKeys(node.children)])
}

export function documentPath(tree: WorkTree, node: WorkNode): string | undefined {
  return node.relPath === null ? undefined : path.join(tree.repo, node.relPath)
}

function textOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

function nodeIn(raw: unknown, at: string): WorkNode {
  if (raw === null || typeof raw !== "object") {
    throw new Error(`${COMMAND}: ${at} is not an object`)
  }
  const row = raw as Record<string, unknown>
  if (typeof row.key !== "string" || row.key === "") {
    throw new Error(`${COMMAND}: ${at} carries no key, and a row with none is no initiative`)
  }
  const children = Array.isArray(row.children) ? row.children : []
  return {
    key: row.key,
    label: typeof row.label === "string" ? row.label : row.key,
    relPath: textOrNull(row.relPath),
    detail: textOrNull(row.detail),
    note: textOrNull(row.note),
    color: textOrNull(row.color ?? row.colour),
    children: children.map((one, index) => nodeIn(one, `${at}.children[${index}]`)),
  }
}

function repoIn(held: Record<string, unknown>): string {
  if (typeof held.repo !== "string" || held.repo === "") {
    throw new Error(`${COMMAND}: the answer names no repo, so no path could be joined against it`)
  }
  return held.repo
}

function answerIn(answered: unknown): Record<string, unknown> {
  if (answered === null || typeof answered !== "object") {
    throw new Error(`${COMMAND}: the answer is not an object, so it names no initiative at all`)
  }
  return answered as Record<string, unknown>
}

export function readWorkTreeAnswer(answered: unknown): WorkTree {
  const held = answerIn(answered)
  if (!Array.isArray(held.roots)) {
    throw new Error(`${COMMAND}: the answer carries no \`roots\` array`)
  }
  return {
    repo: repoIn(held),
    roots: rollUp(held.roots.map((one, index) => nodeIn(one, `roots[${index}]`))),
  }
}

export function readWorkColorsAnswer(answered: unknown): WorkColors {
  const held = answerIn(answered)
  const named = held.byInitiative
  if (named === null || named === undefined || typeof named !== "object") {
    throw new Error(`${COMMAND}: the answer carries no \`byInitiative\` record`)
  }
  const byInitiative: Record<string, string> = {}
  for (const [key, color] of Object.entries(named as Record<string, unknown>)) {
    if (typeof color === "string" && color !== "") {
      byInitiative[key] = color
    }
  }
  return { repo: repoIn(held), byInitiative }
}

async function ask(args: readonly string[]): Promise<unknown> {
  const stdout = await runCommand(commandPath(COMMAND), args, {
    timeout: CALL_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  })
  try {
    return JSON.parse(stdout) as unknown
  } catch (err) {
    throw new Error(`${COMMAND} did not print JSON: ${String(err)}`)
  }
}

// ASKED AS A CHILD RATHER THAN COMPOSED HERE. Composing the tree opens every initiative page, and
// loading a page body wants a transpiler only bun carries, so in this node host the whole reach
// threw at import.
export async function readWorkTree(): Promise<WorkTree> {
  return readWorkTreeAnswer(await ask(["--json"]))
}

// `--colors` opens no initiative page: it reads the seat pages and their sidecars alone, which is
// what a repaint after a seat's turn moves needs and is a small part of what the tree costs.
export async function readWorkColors(): Promise<WorkColors> {
  return readWorkColorsAnswer(await ask(["--colors"]))
}
