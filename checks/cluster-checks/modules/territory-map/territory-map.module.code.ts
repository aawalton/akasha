import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { z } from "zod"

export const TERRITORY_MAP_PATH =
  "checks/cluster-checks/modules/territory-map/territory-map.json"

const TerritoryNodeSchema = z
  .object({
    addon: z.string(),
    package: z.string(),
    state: z.enum(["held", "frontier", "untouched"]),
    kind: z.enum(["native", "ported", "library"]),
    heldBy: z.number().int().nullable(),
    adjacent: z.array(z.string()),
    tiClean: z.boolean().optional(),
    tiCleanBlocked: z.boolean().optional(),
    tiCleanBlockedReason: z.string().optional(),
  })
  .strict()

export type TerritoryNode = z.infer<typeof TerritoryNodeSchema>

const TerritoryMapSchema = z
  .object({
    version: z.number().int(),
    note: z.string(),
    addons: z.array(TerritoryNodeSchema),
  })
  .strict()

export type TerritoryMap = z.infer<typeof TerritoryMapSchema>

export function territoryMapFile(): string {
  return resolve(ownRepoRoot(), TERRITORY_MAP_PATH)
}

export function readTerritoryMap(): TerritoryMap {
  const file = territoryMapFile()
  const map = TerritoryMapSchema.parse(JSON.parse(readFileSync(file, "utf8")))
  if (map.addons.length === 0) {
    throw new Error(`${file} names no addon, so a run over it has nothing to look at`)
  }
  return map
}
