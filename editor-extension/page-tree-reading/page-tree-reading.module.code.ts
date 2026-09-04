import * as path from "node:path"
import { z } from "zod"
import { akashaRoot, runCommand } from "../harness-call/harness-call.module.code.ts"
import {
  assemblePageTree,
  type PageAnswers,
  type PageNode,
  type PageTree,
  type QueryRow,
} from "../page-tree-assemble/page-tree-assemble.module.code.ts"

const COMMAND = "page-tree"

const COMMAND_AT = "commands/page-tree/page-tree.command.code.ts"

const CALL_TIMEOUT_MS = 60_000

const MAX_BUFFER = 16 * 1024 * 1024

const AKASHA = "akasha"

const ROW_SCHEMA = z.object({
  at: z.string().min(1),
  values: z.record(z.string(), z.union([z.string(), z.array(z.string()), z.null()])),
})

const ANSWERS_SCHEMA = z.object({
  types: z.array(ROW_SCHEMA),
  properties: z.array(ROW_SCHEMA),
  propertyTypes: z.array(ROW_SCHEMA),
})

export function countRows(nodes: readonly PageNode[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function countPages(nodes: readonly PageNode[]): number {
  let total = 0
  for (const node of nodes) {
    total += (node.at === null ? 0 : 1) + countPages(node.children)
  }
  return total
}

function rootOfRepo(repo: string): string | undefined {
  return repo === AKASHA ? akashaRoot() : undefined
}

// A ROW STANDING FOR NO PAGE OPENS NOTHING. `at` names the checkout and the path inside it, and a
// checkout this does not hold leaves the row without a document rather than joining a path against
// a root that is not the one the answer meant.
export function documentPath(node: PageNode): string | undefined {
  if (node.at === null) {
    return undefined
  }
  const cut = node.at.indexOf(":")
  const root = rootOfRepo(node.at.slice(0, cut))
  return root === undefined ? undefined : path.join(root, node.at.slice(cut + 1))
}

export function readPageAnswers(answered: unknown): PageAnswers {
  const read = ANSWERS_SCHEMA.safeParse(answered)
  if (!read.success) {
    throw new Error(`${COMMAND} answered in a shape this cannot read: ${read.error.message}`)
  }
  const held = read.data
  return {
    types: held.types as readonly QueryRow[],
    properties: held.properties as readonly QueryRow[],
    propertyTypes: held.propertyTypes as readonly QueryRow[],
  }
}

export async function readPageTree(): Promise<PageTree> {
  const stdout = await runCommand(path.join(akashaRoot(), COMMAND_AT), [], {
    timeout: CALL_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  })
  let answered: unknown
  try {
    answered = JSON.parse(stdout)
  } catch (err) {
    throw new Error(`${COMMAND} did not print JSON: ${String(err)}`)
  }
  return assemblePageTree(readPageAnswers(answered), akashaRoot())
}
