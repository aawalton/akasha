import { parseMotifBookName } from "@akasha/temper-items-core/motif-name-parser"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { ALL_CATEGORIES_ID } from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  characterId,
  type ItemKey,
  type UseDestinationContext,
} from "@akasha/temper-items-rules-core/use-destination-types"
import type { EvalContext } from "@akasha/temper-items-rules-eval/eval-env"
import type { RuleEvalResult, WalkTrace } from "@akasha/temper-items-rules-eval/eval-result"
import { walkRules } from "@akasha/temper-items-rules-eval/evaluator"
import { asObjectRecord } from "@akasha/utils-narrow/as-object-record"
import { requireAt } from "@akasha/utils-narrow/require-at"
import { buildItemFactsForLink } from "../inventory-build-item-facts/inventory-build-item-facts.module.code.ts"
import { buildCompiledCharacterPriority } from "../inventory-character-priority/inventory-character-priority.module.code.ts"
import { buildEsoEvalEnv } from "../inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import { buildMatchContext } from "../inventory-explain-match-context/inventory-explain-match-context.module.code.ts"
import { findItemInInventory } from "../inventory-item-data/inventory-item-data.module.code.ts"
import {
  classifyItem,
  gatherSignals,
  getAncestorChain,
} from "../inventory-rules-classify/inventory-rules-classify.module.code.ts"
import {
  describeInlineConditions,
  type MatchContext,
} from "../inventory-rules-conditions-render/inventory-rules-conditions-render.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  buildUnlockContext,
  buildUnlockItemKey,
} from "../inventory-rules-core-character-finders/inventory-rules-core-character-finders.module.code.ts"

import type { ExplainTrace } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"

const SCHEMA_VERSION = 1
const MAX_REJECTIONS = 50

function buildItemKeyDetail(itemKey: ItemKey): Record<string, number | string> {
  if (itemKey.kind === "recipe") return { resultItemId: itemKey.resultItemId }
  if (itemKey.kind === "motif")
    return {
      styleId: itemKey.styleId,
      chapterId: itemKey.chapterId === null ? "master" : itemKey.chapterId,
    }
  if (itemKey.kind === "script") return { scriptId: itemKey.scriptId }
  return { itemId: itemKey.itemId }
}

function captureMotifLookup(itemLink: string): ExplainTrace["motifLookup"] {
  const [, specializedType] = GetItemLinkItemType(itemLink)
  if (
    specializedType !== SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_BOOK &&
    specializedType !== SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER
  ) {
    return undefined
  }

  const rawName = GetItemLinkName(itemLink)
  const cleanName = zo_strformat("<<1>>", rawName)
  const parsed = parseMotifBookName(cleanName)

  if (parsed !== undefined) {
    return {
      rawName,
      cleanName,
      lookupHit: true,
      coords: {
        styleId: parsed.styleId,
        chapterId: parsed.chapterId,
      },
    }
  }
  return { rawName, cleanName, lookupHit: false }
}

function captureUnlockTrace(
  itemLink: string,
  itemKey: ItemKey
): NonNullable<ExplainTrace["unlockWalk"]> {
  const currentIdStr = tostring(GetCurrentCharacterId())
  const currentId = characterId(currentIdStr)
  const priority = buildCompiledCharacterPriority(currentId)

  const ctx: UseDestinationContext = buildUnlockContext(priority, currentId, itemLink)
  const characters = getTemperCharactersData()

  const entries: NonNullable<ExplainTrace["unlockWalk"]>["priority"] = []
  let chosen: string | undefined
  for (const charId of priority) {
    const knowsRaw = ctx.knowsItem(charId, itemKey)
    let knows: boolean | "no-data-treated-as-knows" = knowsRaw
    if (knowsRaw && charId !== currentIdStr) {
      const charData = characters !== undefined ? asObjectRecord(characters[charId]) : undefined
      if (!charData) knows = "no-data-treated-as-knows"
    }
    const isCandidate = knowsRaw === false && chosen === undefined
    if (isCandidate) chosen = charId
    entries.push({ charId, knows, chosen: isCandidate })
  }

  return { currentCharId: currentIdStr, priority: entries, chosen }
}

function formatCategoryPath(chain: ReadonlyArray<string>): string {
  const parts: string[] = []
  for (let i = chain.length - 1; i >= 0; i--) {
    const id = requireAt(chain, i)
    if (id === ALL_CATEGORIES_ID) continue
    parts.push(id)
  }
  return parts.join(" > ")
}

function pushRejection(
  trace: ExplainTrace,
  index: number,
  categoryId: string,
  action: string,
  reason: ExplainTrace["orderedWalk"]["rejections"][number]["reason"],
  detail?: string
): undefined {
  if (trace.orderedWalk.rejections.length >= MAX_REJECTIONS) return
  trace.orderedWalk.rejections[trace.orderedWalk.rejections.length] = {
    index,
    categoryId,
    action,
    reason,
    detail,
  }
}

function recordRuleResult(
  trace: ExplainTrace,
  result: RuleEvalResult,
  matchCtx: MatchContext,
  rules: ReadonlyArray<CompiledOrderedRule>
): undefined {
  const verdict = result.verdict
  if (verdict.kind === "matched") return
  if (verdict.kind === "rejected") {
    const reason = verdict.reason
    if (reason.kind === "category-mismatch") return
    if (reason.kind === "condition-fail") {
      const rule = requireAt(rules, result.index)
      pushRejection(
        trace,
        result.index,
        result.categoryId,
        result.action,
        "conditions-fail",
        describeInlineConditions(rule, matchCtx)
      )
      return
    }
    if (reason.kind === "destination-resolve-fail") {
      pushRejection(
        trace,
        result.index,
        result.categoryId,
        result.action,
        "destination-resolve-fail",
        reason.detail
      )
      return
    }
    if (reason.kind === "container-skip") {
      pushRejection(
        trace,
        result.index,
        result.categoryId,
        result.action,
        "container-skip",
        reason.detail
      )
      return
    }
    return
  }
  const ireason = verdict.reason
  let detail: string
  if (ireason.kind === "condition-unknown") {
    detail = `condition unknown: ${ireason.conditionKind} (missing ${ireason.missingSignal})`
  } else if (ireason.kind === "category-unknown") {
    detail = `category unknown: missing ${ireason.missingSignal}`
  } else {
    detail = `destination unknown${ireason.detail !== undefined ? `: ${ireason.detail}` : ""}`
  }
  pushRejection(trace, result.index, result.categoryId, result.action, "conditions-fail", detail)
}

export function buildExplainTrace(itemLink: string): ExplainTrace | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const signals = gatherSignals(0, 0, itemLink)
  const leaf = classifyItem(signals)
  const chain = getAncestorChain(leaf)

  const matchCtx = buildMatchContext(itemLink, chain, {
    itemType: signals.itemType,
    traitType: signals.traitType,
  })

  const facts = buildItemFactsForLink(itemLink)

  const found = findItemInInventory(itemLink)
  const itemId = matchCtx.itemId
  const itemNameRaw = GetItemLinkName(itemLink)

  const motifLookup = captureMotifLookup(itemLink)
  const itemKey = buildUnlockItemKey(itemLink, signals.itemType)

  const trace: ExplainTrace = {
    schemaVersion: SCHEMA_VERSION,
    timestamp: GetGameTimeMilliseconds(),
    itemLink,
    itemId,
    itemName: matchCtx.itemName,
    itemNameRaw,
    inventory:
      found !== undefined
        ? { found: true, bagId: found.bagId, slotIndex: found.slotIndex }
        : { found: false },
    signals: {
      itemType: signals.itemType,
      specializedItemType: signals.specializedItemType,
      filterType: signals.filterType,
      traitType: signals.traitType,
      equipType: signals.equipType,
      armorType: signals.armorType,
      weaponType: signals.weaponType,
      quality: matchCtx.quality,
    },
    classification: {
      leafCategoryId: leaf,
      ancestorChain: chain,
      categoryPath: formatCategoryPath(chain),
    },
    motifLookup,
    itemKey:
      itemKey === undefined
        ? { kind: "none", detail: {} }
        : { kind: itemKey.kind, detail: buildItemKeyDetail(itemKey) },
    orderedWalk: {
      rulesConsidered: compiled.orderedRules.length,
      rulesEvaluated: 0,
      rejections: [],
    },
    outcome: { action: "no-match", destination: "nil", summary: "" },
    notes: [],
  }

  if (
    itemKey !== undefined &&
    (itemKey.kind === "recipe" || itemKey.kind === "motif" || itemKey.kind === "script")
  ) {
    trace.unlockWalk = captureUnlockTrace(itemLink, itemKey)
  }

  if (motifLookup !== undefined && !motifLookup.lookupHit) {
    trace.notes[trace.notes.length] =
      `motif name parse miss for "${motifLookup.cleanName}"; buildUnlockItemKey returned undefined → unlock rules cannot match. Likely an unknown chapter suffix not in CHAPTER_SUFFIX_TO_ID (parseMotifBookName) — extend the suffix table.`
  }

  if (!matchCtx.isLocked) {
    const itemRule = compiled.itemRules[itemId]
    if (itemRule !== undefined) {
      trace.itemRulesMatch = {
        itemId,
        action: itemRule.action,
        destination: itemRule.destination,
      }
      trace.outcome = {
        action: itemRule.action,
        destination: itemRule.destination ?? "nil",
        summary: `item rule (itemId=${itemId})`,
      }
      return trace
    }
  }

  const ctx: EvalContext = { env: buildEsoEvalEnv() }
  const ruleTrace: WalkTrace = walkRules(compiled.orderedRules, facts, ctx)
  const rules = compiled.orderedRules

  for (let i = 0; i < ruleTrace.perRule.length; i++) {
    const result = requireAt(ruleTrace.perRule, i)
    if (result.verdict.kind !== "rejected" || result.verdict.reason.kind !== "category-mismatch") {
      trace.orderedWalk.rulesEvaluated++
    }
    recordRuleResult(trace, result, matchCtx, rules)
  }

  const outcome = ruleTrace.outcome
  if (outcome.kind === "matched") {
    const matchedRule = requireAt(rules, outcome.rule.index)
    const destination = outcome.destination ?? "nil"
    trace.orderedWalk.matched = {
      index: outcome.rule.index,
      categoryId: outcome.rule.categoryId,
      action: outcome.action,
      destination,
      conditions: describeInlineConditions(matchedRule, matchCtx),
    }
    trace.outcome = {
      action: outcome.action,
      destination,
      summary: `ordered rule #${outcome.rule.index} (category=${outcome.rule.categoryId})`,
    }
    return trace
  }

  if (outcome.kind === "indeterminate") {
    const provisional = outcome.provisionalMatch
    if (provisional !== undefined) {
      const matchedRule = requireAt(rules, provisional.rule.index)
      const destination = provisional.destination ?? "nil"
      trace.orderedWalk.matched = {
        index: provisional.rule.index,
        categoryId: provisional.rule.categoryId,
        action: provisional.action,
        destination,
        conditions: describeInlineConditions(matchedRule, matchCtx),
      }
      trace.outcome = {
        action: provisional.action,
        destination,
        summary: `provisional rule #${provisional.rule.index} (category=${provisional.rule.categoryId}) — outcome indeterminate`,
      }
    } else {
      trace.outcome = {
        action: "no-match",
        destination: "nil",
        summary: `evaluated ${trace.orderedWalk.rulesEvaluated} rule(s) in category, outcome indeterminate`,
      }
    }
    trace.notes[trace.notes.length] =
      `evaluation outcome is indeterminate — ${outcome.indeterminateRules.length} rule(s) before any deterministic match could not be resolved (see rejections with "condition unknown:" / "category unknown:" / "destination unknown" detail prefixes).`
    return trace
  }

  trace.outcome = {
    action: "no-match",
    destination: "nil",
    summary: `evaluated ${trace.orderedWalk.rulesEvaluated} rule(s) in category, none matched`,
  }
  return trace
}
