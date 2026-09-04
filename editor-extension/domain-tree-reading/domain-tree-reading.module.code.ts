import * as path from "node:path"
import type { ChampionTree, DomainNode } from "../champions-tree/champions-tree.module.code.ts"
import { akashaRoot, runCommand } from "../harness-call/harness-call.module.code.ts"

const COMMAND = "domain-tree"

const COMMAND_AT = "commands/domain-tree/domain-tree.command.code.ts"

const CALL_TIMEOUT_MS = 30_000

const MAX_BUFFER = 16 * 1024 * 1024

// The champion tree beside the checkout it was composed from, so a reader joins the two to open the
// document a row stands for.
export interface DomainTree extends ChampionTree {
  readonly repo: string
}

export function documentPath(tree: DomainTree, node: DomainNode): string {
  return path.join(tree.repo, node.relPath)
}

function nodeIn(raw: unknown, at: string): DomainNode {
  if (raw === null || typeof raw !== "object") {
    throw new Error(`${COMMAND}: ${at} is not an object`)
  }
  const row = raw as Record<string, unknown>
  if (typeof row.slug !== "string" || row.slug === "") {
    throw new Error(`${COMMAND}: ${at} carries no slug, and a row with none is no domain`)
  }
  if (typeof row.relPath !== "string" || row.relPath === "") {
    throw new Error(`${COMMAND}: ${at} carries no relPath, so nothing could be opened for it`)
  }
  const children = Array.isArray(row.children) ? row.children : []
  return {
    slug: row.slug,
    relPath: row.relPath,
    persona: typeof row.persona === "string" ? row.persona : null,
    position: typeof row.position === "number" ? row.position : null,
    children: children.map((one, index) => nodeIn(one, `${at}.children[${index}]`)),
  }
}

export function readDomainTreeAnswer(answered: unknown): DomainTree {
  if (answered === null || typeof answered !== "object") {
    throw new Error(`${COMMAND}: the answer is not an object, so it names no domain at all`)
  }
  const held = answered as Record<string, unknown>
  if (typeof held.repo !== "string" || held.repo === "") {
    throw new Error(`${COMMAND}: the answer names no repo, so no path could be joined against it`)
  }
  if (!Array.isArray(held.roots)) {
    throw new Error(`${COMMAND}: the answer carries no \`roots\` array`)
  }
  const unreached = Array.isArray(held.unreached)
    ? held.unreached.filter((one): one is string => typeof one === "string")
    : []
  return {
    repo: held.repo,
    roots: held.roots.map((one, index) => nodeIn(one, `roots[${index}]`)),
    unreached,
  }
}

export function domainTreeIn(said: string): DomainTree {
  let answered: unknown
  try {
    answered = JSON.parse(said)
  } catch (err) {
    throw new Error(`${COMMAND} did not print JSON: ${String(err)}`)
  }
  return readDomainTreeAnswer(answered)
}

// THE BYTES THE COMMAND SAID, HANDED BACK UNREAD. The panel hashes them to tell an answer that
// carries news from one that says what is already drawn, and a hash of a parsed tree would cost
// the parse this is here to save.
export async function askDomainTree(): Promise<string> {
  return runCommand(path.join(akashaRoot(), COMMAND_AT), [], {
    timeout: CALL_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  })
}
