import {
  PRESS,
  pressLines,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-reading/quest-port-reading.module.code.ts"
import { savedVariablesRootSchema } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { z } from "zod"

const SPOT = z.object({ mapId: z.number(), x: z.number(), y: z.number() })

const TREASURE_PRESS = PRESS.extend({
  slotIndex: z.number().optional(),
  itemId: z.number().optional(),
  itemName: z.string().optional(),
  spots: luaArrayOrEmpty(SPOT).optional(),
})

export const TREASURE_PORT_SAVED_VARIABLES = savedVariablesRootSchema(
  z.object({ treasurePortTrace: luaArrayOrEmpty(TREASURE_PRESS).optional() }).passthrough()
)

export type TreasurePressReading = z.infer<typeof TREASURE_PRESS>

export function treasurePressesIn(
  root: z.infer<typeof TREASURE_PORT_SAVED_VARIABLES>
): readonly TreasurePressReading[] {
  const presses: TreasurePressReading[] = []
  for (const account of Object.values(root.Default ?? {})) {
    presses.push(...(account.$AccountWide?.treasurePortTrace ?? []))
  }
  return presses
}

export function treasurePressLines(press: TreasurePressReading): readonly string[] {
  const spots = (press.spots ?? []).map(
    (spot) => `map ${String(spot.mapId)} (${String(spot.x)}, ${String(spot.y)})`
  )
  return [
    `t=${String(press.at)} treasure press by ${press.character}: slot ${String(press.slotIndex ?? "-")}` +
      ` item ${String(press.itemId ?? "-")} "${press.itemName ?? ""}"`,
    `    spots: ${spots.length === 0 ? "none read" : spots.join("; ")}`,
    ...pressLines(press).slice(1),
  ]
}
