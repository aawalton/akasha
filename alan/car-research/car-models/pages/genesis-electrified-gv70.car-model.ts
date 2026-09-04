import type { CarModel } from "../car-model.page-type.ts"

export const genesisElectrifiedGv70 = {
  id: "019e4add-0566-74d3-910c-2c7f57f63817",
  pageTypeSlug: "car-model",
  slug: "genesis-electrified-gv70",
  title: "Electrified GV70",
  bodyStyle: "suv",
  generation: "1st gen (JK1 platform, electrified variant)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Electrified GV70 is Genesis's BEV adaptation of the gasoline GV70 luxury compact SUV. Unlike the dedicated-platform GV60, it is built on the same body-on-platform shared with the ICE GV70 — assembled at Hyundai Motor Manufacturing Alabama (HMMA), the first Genesis EV built in the US, which earned it federal IRA tax credit eligibility ([Electrek](https://electrek.co/2025/01/02/hyundai-kia-evs-qualify-7500-tax-credit-first-time/), [KBB](https://www.kbb.com/car-news/genesis-electrified-gv70-gets-tax-credit-well-be-all-electric-by-2030/)). Dual-motor AWD is standard, producing 429 hp / 516 lb-ft. For 2026 Genesis upgraded the battery from 77.4 kWh to 84 kWh, added a native NACS port and a new 27-inch OLED display, and dropped the starting MSRP by ~$2.5k ([Genesis USA — Electrified GV70](https://www.genesis.com/us/en/electrified-gv70), [MotorAuthority](https://www.motorauthority.com/news/1145089_2026-genesis-gv70-preview)).",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- [Genesis USA — Electrified GV70](https://www.genesis.com/us/en/electrified-gv70)\n- [Edmunds Electrified GV70](https://www.edmunds.com/genesis/electrified-gv70/)\n- [KBB 2025 Electrified GV70](https://www.kbb.com/genesis/electrified-gv70/2025/specs/)\n- [Electrek — IRA tax credit eligibility](https://electrek.co/2025/01/02/hyundai-kia-evs-qualify-7500-tax-credit-first-time/)\n- [CarBuzz 2025 Electrified GV70](https://carbuzz.com/cars/genesis/electrified-gv70/2025/specs-and-trims/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "genesis",
} as const satisfies CarModel
