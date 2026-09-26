import { isAchievementComplete } from "akasha/temper/addon/pages/characters/modules/pithka-achievement-actions/pithka-achievement-actions.module.code.ts"
import {
  type AchievementColumn,
  type AchievementRow,
  filterAchievements,
  projectColumns,
} from "akasha/temper/addon/pages/characters/modules/pithka-achievements/pithka-achievements.module.code.ts"
import {
  getValue,
  savedVarsDb,
} from "akasha/temper/addon/pages/characters/modules/pithka-saved-vars/pithka-saved-vars.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"

const MASK_LISTS: readonly (readonly [string, readonly number[]])[] = [
  [
    "ta",
    [
      1474, 1136, 1503, 1137, 1462, 1138, 1368, 1344, 1391, 1810, 1829, 1838, 1836, 2077, 2085,
      2086, 2079, 2087, 2075, 2133, 2134, 2135, 2136, 2139, 2140, 2435, 2469, 2470, 2466, 2467,
      2468,
    ],
  ],
  [
    "tb",
    [
      2734, 2736, 2737, 2739, 2740, 2746, 2987, 3005, 3006, 3007, 3003, 3004, 3244, 3250, 3251,
      3252, 3248, 3249, 3560, 3566, 3567, 3568, 3564, 3565, 4015, 4021, 4022, 4023, 4019, 4020,
      4268,
    ],
  ],
  ["tc", [4274, 4275, 4276, 4272, 4273, 4517, 4485]],
  [
    "da",
    [
      1960, 1965, 1966, 2102, 1976, 1981, 1982, 1983, 2153, 2154, 2158, 2159, 2163, 2164, 2167,
      2168, 2261, 2262, 2266, 2267, 2271, 2272, 2275, 2276, 2426, 2427, 2430, 2431, 2416, 2417,
      2421,
    ],
  ],
  [
    "db",
    [
      2422, 2540, 2541, 2545, 2546, 2550, 2551, 2554, 2555, 2695, 2755, 2700, 2701, 2705, 2706,
      2709, 2710, 2832, 2833, 2837, 2838, 2842, 2843, 2846, 2847, 3017, 3018, 3022, 3023, 3027,
      3028,
    ],
  ],
  [
    "dc",
    [
      3031, 3032, 3105, 3153, 3110, 3111, 3115, 3154, 3119, 3120, 3376, 3377, 3380, 3381, 3395,
      3396, 3399, 3400, 3469, 3470, 3473, 3474, 3530, 3531, 3534, 3535, 3811, 3812, 3815, 3816,
      3852,
    ],
  ],
  [
    "dd",
    [
      3853, 3856, 3857, 4110, 4111, 4114, 4115, 4129, 4130, 4133, 4134, 2363, 2364, 2368, 4335,
      4336, 4339, 4340, 4312, 4313, 4316, 4317,
    ],
  ],
]

const WORLDS = [
  "NA Megaserver",
  "EU Megaserver",
  "XB1live",
  "XB1live-eu",
  "PS4live",
  "PS4live-eu",
  "PTS",
]

type MaskPlace = { readonly maskName: string; readonly shift: number }

let lookup: Record<number, MaskPlace | undefined> | undefined

function maskPlaceOf(this: void, id: number): MaskPlace | undefined {
  if (lookup === undefined) {
    const built: Record<number, MaskPlace | undefined> = {}
    for (const [maskName, ids] of MASK_LISTS) {
      ids.forEach((listed, index) => {
        built[listed] = { maskName, shift: index }
      })
    }
    lookup = built
  }
  return lookup[id]
}

type Masks = { ta: number; tb: number; tc: number; da: number; db: number; dc: number; dd: number }

function addMask(this: void, values: string[], masks: Masks, id: number | undefined): undefined {
  if (id === undefined || !isAchievementComplete(id)) return
  const place = maskPlaceOf(id)
  if (place === undefined) {
    values.push(tostring(id))
    return
  }
  const name = place.maskName as keyof Masks
  masks[name] = BitOr(masks[name], BitLShift(1, place.shift))
}

function checksum(this: void, text: string): number {
  let sum = string.byte(text, 1)
  for (let at = 2; at <= text.length; at++) {
    sum = (BitLShift(sum, 5) + string.byte(text, at)) % 2147483648
  }
  return sum
}

function compressed(this: void, rows: readonly Partial<AchievementRow>[]): string {
  const worldName = GetWorldName()
  const worldId = WORLDS.indexOf(worldName) + 1
  const joiningAttempts = savedVarsDb()?.groupFinderUsage.joiningAttempts ?? 0
  const values: string[] = [
    "PAT",
    "v5",
    `gf_${joiningAttempts}`,
    GetDisplayName(),
    os.date("%Y%m%d"),
    worldId === 0 ? worldName : tostring(worldId),
  ]
  const masks: Masks = { ta: 0, tb: 0, tc: 0, da: 0, db: 0, dc: 0, dd: 0 }
  for (const row of rows) {
    if (row.TYPE === "baseDungeon-wI" || row.TYPE === "baseDungeon-noI") {
      if (row.HM !== undefined && isAchievementComplete(row.HM)) {
        values.push(tostring(row.HM))
      } else if (row.VET !== undefined && isAchievementComplete(row.VET)) {
        values.push(tostring(row.VET))
      }
    } else {
      addMask(values, masks, row.EXT)
      addMask(values, masks, row.TRI)
      addMask(values, masks, row.HM)
      addMask(values, masks, row.PHM2)
      addMask(values, masks, row.PHM1)
      addMask(values, masks, row.VET)
      addMask(values, masks, row.CHA)
    }
  }
  for (const [prefix, value] of pairs(masks)) {
    if (value !== 0) values.push(`${prefix}${value}`)
  }
  const text = table.concat(values, ",")
  return `${text},${checksum(text)}`
}

function rowsOf(
  this: void,
  filter: Partial<AchievementRow>,
  columns: readonly AchievementColumn[]
): Partial<AchievementRow>[] {
  return projectColumns(filterAchievements(filter), columns)
}

export function qrPayload(this: void): string {
  const screen = getValue("currentScreen")
  let rows: Partial<AchievementRow>[] = []
  if (screen === "Starter Dungeons") {
    const columns: AchievementColumn[] = ["VET", "HM", "TYPE"]
    rows = [
      ...rowsOf({ TYPE: "baseDungeon-wI" }, columns),
      ...rowsOf({ TYPE: "baseDungeon-noI" }, columns),
    ]
  } else if (screen === "4 Man Trifectas") {
    const columns: AchievementColumn[] = ["VET", "HM", "CHA", "TRI", "TYPE"]
    rows = [...rowsOf({ TYPE: "triDungeon" }, columns), ...rowsOf({ ABBV: "BRP" }, columns)]
  } else if (screen === "Trials") {
    rows = rowsOf({ TYPE: "trial" }, ["VET", "PHM1", "PHM2", "HM", "TRI", "EXT", "TYPE"])
  } else if (screen === "All Scores and Tris") {
    const columns: AchievementColumn[] = ["TRI", "TYPE"]
    rows = [
      ...rowsOf({ TYPE: "trial" }, columns),
      ...rowsOf({ TYPE: "arena" }, columns),
      ...rowsOf({ TYPE: "endless" }, columns),
      ...rowsOf({ TYPE: "triDungeon" }, columns),
    ]
  }
  return compressed(rows)
}
