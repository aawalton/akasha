import type { CarYear } from "../car-year.page-type.ts"

export const fordMustangMachE2025 = {
  id: "019e4ade-696b-7883-8cfb-c382fad97e94",
  pageTypeSlug: "car-year",
  slug: "ford-mustang-mach-e-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Largely a carryover from the MY2024 refresh that added the Rally trim, BlueCruise 1.3, and OTA-improved acceleration. MY2025 keeps Select / Premium / GT / Rally. Standard Range battery is 73 kWh usable LFP (RWD only on Select/Premium standard); Extended Range is 91 kWh usable NMC. Range up to 320 mi (RWD Premium ER). Tesla Supercharger access via NACS adapter (included or $200 add-on depending on purchase timing). Federal tax credit eligibility largely maintained (point-of-sale $7,500 lease credit; purchase credit varies by trim/battery sourcing). Sources: [Ford.com 2025 Mach-E](https://www.ford.com/suvs/mach-e/?intcmp=vhp-seconNav-future), [KBB 2025 Mach-E](https://www.kbb.com/ford/mustang-mach-e/2025/premium/), [Ford Authority Mach-E TSP+](https://fordauthority.com/2025/03/ford-mustang-mach-e-wins-2025-iihs-top-safety-pick-award/).",
  shortList: false,
  sources:
    "- [Ford.com 2025 Mach-E](https://www.ford.com/suvs/mach-e/)\n- [KBB 2025 specs](https://www.kbb.com/ford/mustang-mach-e/2025/specs/)\n- [Edmunds 2025 Mach-E](https://www.edmunds.com/ford/mustang-mach-e/2025/)",
  exclusionReason: "American car manufacturer — personal exclusion",
  carModelSlug: "ford-mustang-mach-e",
} as const satisfies CarYear
