import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { classifyItemToNodeIds } from "@akasha/temper-items-core/classify-item-node-ids"
import { parseInventoryContent } from "@akasha/temper-items-core/inventory-parser"
import type {
  InventoryDatabase,
  InventoryItemData,
} from "@akasha/temper-items-core/inventory-types"
import { parseItemLink } from "@akasha/temper-items-core/item-link-parser"
import { parseMotifBookName } from "@akasha/temper-items-core/motif-name-parser"
import { getRecipeResultId } from "@akasha/temper-items-core/recipe-result-id-lookup"
import { getScriptItemIdByName } from "@akasha/temper-items-core/script-knowledge-lookup"

const INPUT = 1

const DATA = 2

const INVENTORY_PATH = "--inventory-path"

const JSON_FLAG = "--json"

const INVENTORY_LUA = "TemperInventory.lua"

const MASTER = "master"

type Classification =
  | { readonly kind: "recipe"; readonly resultItemId: number }
  | { readonly kind: "script"; readonly scriptId: number }
  | { readonly kind: "motif"; readonly styleId: number; readonly chapterId: number | null }
  | { readonly kind: "unknown" }

export type Read =
  | { readonly named: string; readonly inventoryPath: string | null; readonly json: boolean }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let named: string | null = null
  let inventoryPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("--")) {
        refusals.push(`\`${INVENTORY_PATH}\` names the file to read, and no file followed it`)
        continue
      }
      inventoryPath = value
      continue
    }
    if (one.startsWith("--")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${INVENTORY_PATH}\` and \`${JSON_FLAG}\``
      )
      continue
    }
    if (named !== null) {
      refusals.push(`\`${one}\` follows the item already named, and one call names one item`)
      continue
    }
    named = one
  }
  if (named === null) {
    refusals.push("this names no item — it takes an item id or a whole ESO item link")
  }
  if (refusals.length > 0 || named === null) return { refused: refusals }
  return { named, inventoryPath, json }
}

function wholeNumberIn(said: string): number | null {
  if (!/^\d+$/.test(said)) return null
  const held = Number(said)
  return Number.isInteger(held) && held >= 0 ? held : null
}

function itemInDatabase(db: InventoryDatabase, itemId: number): InventoryItemData | null {
  for (const location of Object.values(db.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        if (item.itemId === itemId) return item
      }
    }
  }
  return null
}

function classificationOf(name: string): Classification {
  const resultItemId = getRecipeResultId(name)
  if (resultItemId !== undefined) return { kind: "recipe", resultItemId }
  const scriptId = getScriptItemIdByName(name)
  if (scriptId !== undefined) return { kind: "script", scriptId }
  const motif = parseMotifBookName(name)
  if (motif !== undefined) {
    return { kind: "motif", styleId: motif.styleId, chapterId: motif.chapterId }
  }
  return { kind: "unknown" }
}

function jsonOf(
  itemId: number,
  match: InventoryItemData | null,
  classification: Classification,
  categoryNodeIds: readonly string[]
): Record<string, unknown> {
  const base = {
    itemId,
    itemLink: match?.itemLink ?? null,
    itemName: match?.itemName ?? null,
    classification: classification.kind,
    categoryNodeIds,
  }
  if (classification.kind === "recipe") {
    return { ...base, recipeResultItemId: classification.resultItemId }
  }
  if (classification.kind === "script") return { ...base, scriptId: classification.scriptId }
  if (classification.kind === "motif") {
    return {
      ...base,
      motifStyleId: classification.styleId,
      motifChapterId: classification.chapterId === null ? MASTER : classification.chapterId,
    }
  }
  return base
}

export function rowsOf(
  itemId: number,
  match: InventoryItemData | null,
  classification: Classification,
  categoryNodeIds: readonly string[]
): readonly string[] {
  const lines: string[] = [
    `itemId\t${itemId}`,
    `itemLink\t${match?.itemLink ?? ""}`,
    `itemName\t${match?.itemName ?? ""}`,
    `classification\t${classification.kind}`,
    `categoryNodeIds\t${JSON.stringify(categoryNodeIds)}`,
  ]
  if (classification.kind === "recipe") {
    lines.push(`recipeResultItemId\t${classification.resultItemId}`)
  } else if (classification.kind === "script") {
    lines.push(`scriptId\t${classification.scriptId}`)
  } else if (classification.kind === "motif") {
    lines.push(`motifStyleId\t${classification.styleId}`)
    lines.push(
      `motifChapterId\t${classification.chapterId === null ? MASTER : classification.chapterId}`
    )
  }
  return lines
}

export async function temperInventoryLookupItem(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const itemId = wholeNumberIn(read.named) ?? parseItemLink(read.named)?.itemId ?? null
  if (itemId === null) {
    return refused(`\`${read.named}\` reads as neither an item id nor an item link`, INPUT)
  }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  let content: string
  try {
    content = await readFile(at, "utf8")
  } catch (thrown) {
    return refused(`${INVENTORY_LUA} at ${at} would not open — ${whyOf(thrown)}`, DATA)
  }
  const match = itemInDatabase(parseInventoryContent(content), itemId)
  const classification: Classification =
    match === null ? { kind: "unknown" } : classificationOf(match.itemName)
  const categoryNodeIds = match === null ? [] : classifyItemToNodeIds(match)
  if (read.json) {
    return {
      report: [JSON.stringify(jsonOf(itemId, match, classification, categoryNodeIds))],
      refusals: [],
      code: 0,
    }
  }
  return {
    report: [...rowsOf(itemId, match, classification, categoryNodeIds)],
    refusals: [],
    code: 0,
  }
}
