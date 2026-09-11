import { resolve } from "node:path"
import { savedVarsFile } from "akasha/temper/eso-paths/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { savedVariablesRootSchema } from "akasha/temper/saved-variables/account-wide/account-wide.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/saved-variables/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/saved-variables/lua-parser/lua-parser.module.code.ts"
import { z } from "zod"
import type { Answer, Given } from "../../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../../modules/calling/calling.module.code.ts"
import { whyOf } from "../../../../../modules/fault-saying/fault-saying.module.code.ts"
import { readInventoryFileArgs } from "../../../../../modules/inventory-file-arguing/inventory-file-arguing.module.code.ts"
import { numSaid } from "../../../../../modules/inventory-trace-saying/inventory-trace-saying.module.code.ts"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const INVENTORY_LUA = "TemperInventory.lua"

const SAVED_VARIABLES = "TemperInventory_SavedVariables"

type MasterConsumableTrace = {
  readonly timestamp: number
  readonly craftType: number
  readonly itemId: number
  readonly materialItemId: number
  readonly targetQuality: number
  readonly encodedAlchemyTraits: number
  readonly needed: number
  readonly phase: string
  readonly outcome: string
  readonly solventFound?: boolean
  readonly reagent1Id?: number
  readonly reagent2Id?: number
  readonly reagent3Id?: number
  readonly recipeListIndex?: number
  readonly recipeIndex?: number
  readonly potencyRuneId?: number
  readonly essenceRuneId?: number
  readonly aspectRuneId?: number
  readonly interactionType?: number
  readonly maxIter?: number
  readonly yieldPerIter?: number
  readonly iterations?: number
  readonly diag?: string
}

function bool(value: boolean | undefined): string {
  return value === undefined ? "nil" : value ? "y" : "n"
}

export function consumableTraceSaid(traces: readonly MasterConsumableTrace[]): readonly string[] {
  const lines: string[] = [`[master consumable traces] ${traces.length} entry(ies), oldest first`]
  for (const one of traces) {
    lines.push(
      `@${one.timestamp} ${one.phase.toUpperCase()} OUTCOME=${one.outcome} ` +
        `craftType=${one.craftType} itemId=${one.itemId} needed=${one.needed} ` +
        `targetQuality=${one.targetQuality}`
    )
    lines.push(
      `  spec: materialItemId=${one.materialItemId} ` +
        `encodedAlchemyTraits=${one.encodedAlchemyTraits}`
    )
    if (one.solventFound !== undefined || one.reagent1Id !== undefined) {
      lines.push(
        `  alchemy: solventFound=${bool(one.solventFound)} reagents=[${numSaid(one.reagent1Id)},` +
          `${numSaid(one.reagent2Id)},${numSaid(one.reagent3Id)}]`
      )
    }
    if (one.recipeListIndex !== undefined || one.recipeIndex !== undefined) {
      lines.push(
        `  provisioning: recipeListIndex=${numSaid(one.recipeListIndex)} ` +
          `recipeIndex=${numSaid(one.recipeIndex)}`
      )
    }
    if (
      one.potencyRuneId !== undefined ||
      one.essenceRuneId !== undefined ||
      one.aspectRuneId !== undefined
    ) {
      lines.push(
        `  enchanting: potency=${numSaid(one.potencyRuneId)} essence=${numSaid(one.essenceRuneId)} ` +
          `aspect=${numSaid(one.aspectRuneId)}`
      )
    }
    if (
      one.interactionType !== undefined ||
      one.maxIter !== undefined ||
      one.iterations !== undefined ||
      one.yieldPerIter !== undefined
    ) {
      lines.push(
        `  execute: interactionType=${numSaid(one.interactionType)} ` +
          `maxIter=${numSaid(one.maxIter)} yieldPerIter=${numSaid(one.yieldPerIter)} ` +
          `iterations=${numSaid(one.iterations)}`
      )
    }
    if (one.diag !== undefined) lines.push(`  diag: ${one.diag}`)
  }
  return lines
}

function traceSchema(): z.ZodTypeAny {
  return z
    .object({
      timestamp: z.number(),
      craftType: z.number(),
      itemId: z.number(),
      materialItemId: z.number(),
      targetQuality: z.number(),
      encodedAlchemyTraits: z.number(),
      needed: z.number(),
      phase: z.enum(["resolve", "execute"]),
      solventFound: z.boolean().optional(),
      reagent1Id: z.number().optional(),
      reagent2Id: z.number().optional(),
      reagent3Id: z.number().optional(),
      recipeListIndex: z.number().optional(),
      recipeIndex: z.number().optional(),
      potencyRuneId: z.number().optional(),
      essenceRuneId: z.number().optional(),
      aspectRuneId: z.number().optional(),
      interactionType: z.number().optional(),
      maxIter: z.number().optional(),
      yieldPerIter: z.number().optional(),
      iterations: z.number().optional(),
      diag: z.string().optional(),
      outcome: z.enum([
        "nothing-needed",
        "no-solvent",
        "no-reagent-combo",
        "unknown-recipe",
        "unresolved-glyph",
        "enqueued",
        "not-in-interaction",
        "missing-ingredients",
        "ingredient-bounded",
        "crafted",
      ]),
    })
    .strict()
}

type Held = { readonly traces: readonly MasterConsumableTrace[] } | { readonly why: string }

async function tracesIn(at: string): Promise<Held> {
  const file = Bun.file(at)
  if (!(await file.exists())) return { why: `${INVENTORY_LUA}: nothing is at ${at}` }
  const content = await file.text()
  const rootSchema = savedVariablesRootSchema(
    z
      .object({
        diagnostics: z
          .object({ masterConsumableTraces: luaArrayOrEmpty(traceSchema()).optional() })
          .passthrough()
          .optional(),
      })
      .passthrough()
  )
  const root = rootSchema.parse(parseLuaSavedVariablesFile(content, SAVED_VARIABLES))
  const defaultTable = root.Default
  if (!defaultTable) return { why: `${INVENTORY_LUA} at ${at} carries no Default table` }
  const accountKeys = Object.keys(defaultTable).filter((one) => one.startsWith("@"))
  if (accountKeys.length === 0) {
    return { why: `${INVENTORY_LUA} at ${at} carries no @<account> entry under Default` }
  }
  for (const key of accountKeys) {
    const traces = defaultTable[key]?.$AccountWide?.diagnostics?.masterConsumableTraces
    if (traces !== undefined) return { traces: traces as readonly MasterConsumableTrace[] }
  }
  return {
    why:
      `${INVENTORY_LUA} at ${at} carries no diagnostics.masterConsumableTraces under any ` +
      "@<account>/$AccountWide — accept a consumable master writ, open the station, then reload",
  }
}

export async function temperInventoryMasterConsumableTrace(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readInventoryFileArgs(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  let held: Held
  try {
    held = await tracesIn(at)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if ("why" in held) return refused(held.why, DATA)
  if (read.json) return { report: [JSON.stringify(held.traces)], refusals: [], code: 0 }
  return { report: [...consumableTraceSaid(held.traces)], refusals: [], code: 0 }
}
