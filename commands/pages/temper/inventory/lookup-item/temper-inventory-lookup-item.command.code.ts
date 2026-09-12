import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { inventoryPath as inventoryPathArgument } from "akasha/commands/arguments/pages/inventory-path.argument.ts"
import { item as itemArgument } from "akasha/commands/arguments/pages/item.argument.ts"
import { json as jsonArgument } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperInventoryLookupItem as page } from "akasha/commands/pages/temper/inventory/lookup-item/temper-inventory-lookup-item.command.ts"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { classifyItemToNodeIds } from "akasha/temper/items-core/classify-item-node-ids/classify-item-node-ids.module.code.ts"
import { parseInventoryContent } from "akasha/temper/items-core/inventory-parser/inventory-parser.module.code.ts"
import type {
  InventoryDatabase,
  InventoryItemData,
} from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { parseItemLink } from "akasha/temper/items-core/item-link-parser/item-link-parser.module.code.ts"
import { parseMotifBookName } from "akasha/temper/items-core/motif-name-parser/motif-name-parser.module.code.ts"
import { getRecipeResultId } from "akasha/temper/items-core/recipe-result-id-lookup/recipe-result-id-lookup.module.code.ts"
import { getScriptItemIdByName } from "akasha/temper/items-core/script-knowledge-lookup/script-knowledge-lookup.module.code.ts"
import { wholeNumberIn } from "akasha/utils/narrow/whole-number-in/whole-number-in.module.code.ts"

const NAMED = [jsonArgument, inventoryPathArgument, itemArgument]

const INVENTORY_LUA = "TemperInventory.lua"

const MASTER = "master"

const NOT_CAPTURED = "not captured"

function boolSaid(held: boolean | undefined): string {
  return held === undefined ? NOT_CAPTURED : String(held)
}

type Classification =
  | { readonly kind: "recipe"; readonly resultItemId: number }
  | { readonly kind: "script"; readonly scriptId: number }
  | { readonly kind: "motif"; readonly styleId: number; readonly chapterId: number | null }
  | { readonly kind: "unknown" }

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
    junk: match?.junk ?? null,
    junkable: match?.junkable ?? null,
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
    `junk\t${boolSaid(match?.junk)}`,
    `junkable\t${boolSaid(match?.junkable)}`,
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
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const itemId = wholeNumberIn(taken.item) ?? parseItemLink(taken.item)?.itemId ?? null
  if (itemId === null) {
    return refused(`\`${taken.item}\` reads as neither an item id nor an item link`, INPUT)
  }
  const root = resolve(given.root)
  const at =
    taken.inventoryPath === undefined
      ? savedVarsFile(INVENTORY_LUA)
      : resolve(root, taken.inventoryPath)
  let content: string
  try {
    content = await readFile(at, "utf8")
  } catch (thrown) {
    return refused(`${INVENTORY_LUA} at ${at} would not open — ${whyOf(thrown)}`, DATA)
  }
  const match = itemInDatabase(parseInventoryContent(content), itemId)
  if (match === null) {
    return refused(
      `no capture in ${at} holds item ${String(itemId)}, so there is nothing here to classify`,
      DATA
    )
  }
  const classification: Classification = classificationOf(match.itemName)
  const categoryNodeIds = classifyItemToNodeIds(match)
  if (taken.json) return asJson(jsonOf(itemId, match, classification, categoryNodeIds))
  return told([...rowsOf(itemId, match, classification, categoryNodeIds)])
}
