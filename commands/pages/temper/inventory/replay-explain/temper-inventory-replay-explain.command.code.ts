import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { itemlink } from "akasha/commands/arguments/pages/itemlink.argument.ts"
import {
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { temperInventoryReplayExplain as page } from "akasha/commands/pages/temper/inventory/replay-explain/temper-inventory-replay-explain.command.ts"
import { readLastExplain } from "akasha/temper/commands/explain-replay-reading/explain-replay-reading.module.code.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import {
  formatExplainWalk,
  type JsonOutput,
  type RuleTraceRow,
} from "akasha/temper/explain/explain-walk/explain-walk.module.code.ts"

const TAKES = [inventoryPathArgument, itemlink]

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

function itemKeySaid(itemKey: ExplainTrace["itemKey"]): string | null {
  if (itemKey.kind === NO_KEY) return null
  const entries = Object.entries(itemKey.detail)
  if (entries.length === 0) return itemKey.kind
  return `${itemKey.kind}:${entries.map(([key, value]) => `${key}=${String(value)}`).join(",")}`
}

function outputOf(trace: ExplainTrace): JsonOutput {
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
    junk: null,
    junkable: null,
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
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken
  const root = resolve(given.root)
  const at =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(root, taken.inventoryPath)
  let trace: ExplainTrace
  try {
    trace = (await readLastExplain(at)) as ExplainTrace
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if (taken.itemlink !== undefined && taken.itemlink !== trace.itemLink) {
    return refused(
      `the stored trace is for item ${trace.itemId} (${trace.itemLink}), ` +
        `and \`${itemlink.said} ${taken.itemlink}\` names another`,
      INPUT
    )
  }
  const said = formatExplainWalk(outputOf(trace))
  return told([`[addon @ ${trace.timestamp}]`, ...said.replace(/\n+$/, "").split("\n")])
}
