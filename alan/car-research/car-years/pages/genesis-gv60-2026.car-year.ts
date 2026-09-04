import type { CarYear } from "../car-year.page-type.ts"

export const genesisGv602026 = {
  id: "019e4add-5000-73d6-bdfa-6cbc1446025b",
  pageTypeSlug: "car-year",
  slug: "genesis-gv60-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Major mid-cycle refresh. Battery grows from 77.4 kWh to 84 kWh, increasing EPA range to 306 mi (Standard RWD) — a ~12% improvement. Native NACS port replaces CCS1, granting OEM-level access to ~20,000 Tesla Superchargers ([Genesis USA — GV60](https://www.genesis.com/us/en/gv60)). New 27-inch OLED panoramic display replaces the prior dual 12.3-inch screens. Trim naming changes: 'Standard' renamed to 'base RWD' / 'base AWD'; Advanced and Performance trims continue. Pricing: base RWD $52,525 (+$175), base AWD $56,025, Advanced AWD $59,405 (-$1,495), Performance AWD $71,875 (+$1,975) ([Edmunds 2026](https://www.edmunds.com/genesis/gv60/2026/features-specs/)). Performance gains Boost mode (483 hp burst, 10 sec).",
  shortList: false,
  sources:
    "- [Genesis USA — 2026 GV60](https://www.genesis.com/us/en/gv60)\n- [Edmunds 2026 GV60](https://www.edmunds.com/genesis/gv60/2026/features-specs/)\n- [Cars.com 2026 GV60](https://www.cars.com/research/genesis-gv60-2026/)\n- [CarBuzz 2026 GV60](https://carbuzz.com/cars/genesis/gv60/2026/specs-and-trims/)",
  exclusionReason: "All trims excluded",
  carModelSlug: "genesis-gv60",
} as const satisfies CarYear
