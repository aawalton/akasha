import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import {
  formatExplainWalk,
  type JsonOutput,
  type RuleTraceRow,
} from "@akasha/temper-explain/explain-walk"
import { readLastExplain } from "../explain-replay-reading/explain-replay-reading.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const ITEM_LINK = "--itemlink"

const INVENTORY_LUA = "TemperInventory.lua"

const NO_KEY = "none"

type Rejection = {
  readonly index: number
  readonly categoryId: string
  readonly action: string
  readonly reason: string
  readonly detail?: string
}

type MatchedWalk = {
  readonly index: number
  readonly categoryId: string
  readonly action: string
  readonly destination: string
  readonly conditions: string
}

type ExplainTrace = {
  readonly timestamp: number
  readonly itemLink: string
  readonly itemId: number
  readonly itemName: string
  readonly classification: { readonly ancestorChain: readonly string[] }
  readonly itemKey: {
    readonly kind: string
    readonly detail: Readonly<Record<string, number | string | boolean>>
  }
  readonly orderedWalk: {
    readonly matched?: MatchedWalk
    readonly rejections: readonly Rejection[]
  }
  readonly outcome: {
    readonly action: string
    readonly destination: string
    readonly summary: string
  }
}

export type Read =
  | { readonly inventoryPath: string | null; readonly itemLink: string | null }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let itemLink: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === INVENTORY_PATH || one === ITEM_LINK) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` takes a value, and none followed it`)
        continue
      }
      if (one === INVENTORY_PATH) inventoryPath = value
      else itemLink = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\` and \`${ITEM_LINK}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, itemLink }
}

function itemKeySaid(itemKey: ExplainTrace["itemKey"]): string | null {
  if (itemKey.kind === NO_KEY) return null
  const entries = Object.entries(itemKey.detail)
  if (entries.length === 0) return itemKey.kind
  return `${itemKey.kind}:${entries.map(([key, value]) => `${key}=${String(value)}`).join(",")}`
}

export function outputOf(trace: ExplainTrace): JsonOutput {
  const perRule: RuleTraceRow[] = []
  const matched = trace.orderedWalk.matched
  if (matched !== undefined) {
    perRule.push({
      index: matched.index,
      ruleId: null,
      categoryId: matched.categoryId,
      action: matched.action,
      destination: matched.destination,
      verdict: "matched",
      verdictDetail: matched.conditions === "" ? null : matched.conditions,
      resolvedDestination: trace.outcome.destination,
    })
  }
  for (const one of trace.orderedWalk.rejections) {
    perRule.push({
      index: one.index,
      ruleId: null,
      categoryId: one.categoryId,
      action: one.action,
      destination: null,
      verdict: "rejected",
      verdictDetail: one.detail !== undefined ? `${one.reason} (${one.detail})` : one.reason,
      resolvedDestination: null,
    })
  }
  return {
    itemId: trace.itemId,
    itemName: trace.itemName,
    itemLink: trace.itemLink,
    categoryNodeIds: trace.classification.ancestorChain,
    itemKey: itemKeySaid(trace.itemKey),
    ttc: null,
    perRule,
    outcome: {
      kind: matched !== undefined ? "matched" : "implicit-terminal",
      action: trace.outcome.action,
      destination: trace.outcome.destination,
      label: trace.outcome.summary,
      indeterminateRules: [],
    },
  }
}

export async function temperInventoryReplayExplain(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  let trace: ExplainTrace
  try {
    trace = (await readLastExplain(at)) as ExplainTrace
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if (read.itemLink !== null && read.itemLink !== trace.itemLink) {
    return refused(
      `the stored trace is for item ${trace.itemId} (${trace.itemLink}), ` +
        `and \`${ITEM_LINK} ${read.itemLink}\` names another`,
      INPUT
    )
  }
  const said = formatExplainWalk(outputOf(trace))
  return {
    report: [`[addon @ ${trace.timestamp}]`, ...said.replace(/\n+$/, "").split("\n")],
    refusals: [],
    code: 0,
  }
}
