import { requireAt } from "akasha/code/type/narrowing/modules/require-at/require-at.module.code.ts"
import { buildBuyExplainTrace } from "akasha/temper/addon/pages/items/modules/inventory-buy-explain-trace-builder/inventory-buy-explain-trace-builder.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { BuyExplainRule } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import { parseLuaCapture } from "akasha/temper/addon/shared/narrow/modules/parse-lua-capture/parse-lua-capture.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const PREFIX = "[TemperBuyExplain]"

function printRule(r: BuyExplainRule): undefined {
  if (r.targetQuantity === undefined) {
    d(
      `${PREFIX} rule ${r.ruleId} (${r.categoryId}): no by-priority leg, so no target to buy toward`
    )
    return
  }
  d(
    `${PREFIX} rule ${r.ruleId} (${r.categoryId}): target=${r.targetQuantity}, held=${r.held}, shortfall=${r.shortfall}`
  )
  d(
    r.buyMaxPrice === undefined
      ? `${PREFIX}   max price: none stated — a merchant's price, or TTC's suggested price at a guild store`
      : `${PREFIX}   max price: ${r.buyMaxPrice}g each, at a merchant and at a guild store`
  )
  const s = r.storeScan
  if (!s.storeOpen) {
    d(`${PREFIX}   store: NOT OPEN (0 entries) — open a merchant and re-run to scan`)
    return
  }
  if (s.matchedEntryIndex === undefined) {
    d(
      `${PREFIX}   store: ${s.numEntries} entries, none the rule takes can be bought here within the max price`
    )
    return
  }
  d(
    `${PREFIX}   store: ${s.entriesTaken} entries taken; best #${s.matchedEntryIndex} itemId=${s.matchItemId ?? "?"}, price=${s.matchPrice ?? "?"}, maxBuyable=${s.matchMaxBuyable ?? "?"}, computedQty=${s.computedQuantity ?? 0}`
  )
  if ((s.computedQuantity ?? 0) <= 0) {
    d(`${PREFIX}   => would NOT buy (qty 0: check the shortfall and the gold carried)`)
  } else {
    d(`${PREFIX}   => would buy ${s.computedQuantity}`)
  }
}

export function onTemperItemsExplainBuyCommand(this: void, args: string): undefined {
  const argsStr = args !== undefined ? args : ""
  const [captured] = string.match(argsStr, "(|H.-|h.-|h)")
  const matched = parseLuaCapture(captured)

  const trace = buildBuyExplainTrace(matched)
  if (trace === undefined) {
    d(`${PREFIX} No compiled rules found. Export settings from Temper first.`)
    return
  }

  const sv = getSavedVariables()
  if (!sv.diagnostics) sv.diagnostics = {}
  sv.diagnostics.lastBuyExplain = trace

  const firstRule = trace.rules.length > 0 ? requireAt(trace.rules, 0) : undefined
  const numEntries = firstRule !== undefined ? firstRule.storeScan.numEntries : 0
  d(
    `${PREFIX} current=${trace.currentCharId}, money=${trace.playerMoney}, storeEntries=${numEntries}, rules=${trace.rules.length}`
  )
  if (trace.rules.length === 0) {
    d(
      matched === undefined
        ? `${PREFIX} no stock rule buys its shortfall`
        : `${PREFIX} no stock rule buying its shortfall takes this item`
    )
  }
  for (const r of trace.rules) printRule(r)
  d(`${PREFIX} Full trace => SavedVariables.diagnostics.lastBuyExplain`)
}
