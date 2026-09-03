import type { CarModel } from "../car-model.page-type.ts"

export const fordF150Lightning = {
  id: "019e4add-97ca-76aa-8e9b-eefadb771643",
  pageTypeSlug: "car-model",
  slug: "ford-f-150-lightning",
  title: "F-150 Lightning",
  bodyStyle: "truck",
  generation: "1st gen (14th gen F-150 architecture, BEV variant)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Ford's first battery-electric full-size pickup truck, launched as a 2022 MY. Built on a heavily modified version of the 14th-gen F-150 platform with a steel frame, independent rear suspension (vs. ICE F-150's live axle), and a flat lithium-ion battery between the rails. Two battery options (98 kWh Standard Range, 131 kWh Extended Range), dual-motor AWD standard, up to 580 hp / 775 lb-ft and 320 mi range. Pro Power Onboard provides up to 9.6 kW for jobsite/grid-down use. MY2025 lineup: Pro (fleet), XLT, Flash, Lariat, Platinum. MY2026 drops the SR battery (123 kWh becomes minimum), replaces XLT with off-road STX, restricts Pro to fleet. **Production indefinitely paused since Oct 2025** due to a Novelis aluminum supplier fire and profitability pressures — Ford redirected the Rouge EV Center workforce to ICE/hybrid F-150 production at the adjacent Dearborn Truck Plant. MY2025 and announced MY2026 inventory remains at US dealers as of May 2026. Sources: [Ford.com F-150 Lightning](https://www.ford.com/trucks/f150-lightning/), [Ford Authority - 2026 Lightning trims](https://fordauthority.com/2025/10/2026-ford-f-150-lightning-msrp-cut-for-two-trims/), [Wikipedia - F-150 Lightning](https://en.wikipedia.org/wiki/Ford_F-150_Lightning).",
  powertrainOptions: ["BEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- [Ford.com F-150 Lightning](https://www.ford.com/trucks/f150-lightning/)\n- [Edmunds F-150 Lightning](https://www.edmunds.com/ford/f-150-lightning/)\n- [Ford Authority - Lightning production halt](https://ev.com/news/ford-f-150-lightning-production-halted-indefinitely-after-supplier-fire)\n- [KBB F-150 Lightning 2025](https://www.kbb.com/ford/f150-lightning/2025/specs/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "ford",
} as const satisfies CarModel
