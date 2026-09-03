import type { CarYear } from "../car-year.page-type.ts"

export const polestarPolestar32026 = {
  id: "019e4af3-6970-7cb1-a47e-54472e88e90d",
  pageTypeSlug: "car-year",
  slug: "polestar-polestar-3-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Major mid-cycle refresh in only the model's second year: switch from 400V to 800V electrical architecture, peak DC fast charging raised from 250 kW to 350 kW (310 kW on rear-motor trim), 10-80% now ~22 min (down from ~30 min). Output bumped across the board: Rear Motor 333 hp (was 295), Dual Motor 544 hp (was 489), Performance 680 hp (was 517). Trim names simplified to Rear Motor / Dual Motor / Performance. Active air suspension newly available on Dual Motor. NVIDIA DRIVE AGX Orin processor replaces prior compute, claimed ~8x AI processing uplift (30 -> 254 TOPS) — relevant to future ADAS feature additions via OTA. New Climate and Prime option packs introduced. Sources: https://carbuzz.com/2026-polestar-3-updates/, https://www.autoblog.com/news/2026-polestar-3-updates, https://www.carsdirect.com/polestar/3/2026",
  shortList: false,
  sources:
    "- https://carbuzz.com/2026-polestar-3-updates/\n- https://www.autoblog.com/news/2026-polestar-3-updates\n- https://www.carsdirect.com/polestar/3/2026\n- https://www.polestar.com/us/polestar-3/specifications/",
  exclusionReason: "All trims excluded",
  carModelSlug: "polestar-polestar-3",
} as const satisfies CarYear
