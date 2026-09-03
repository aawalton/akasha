import type { CarYear } from "../car-year.page-type.ts"

export const lamborghiniRevuelto2025 = {
  id: "019e4ae5-5e86-7389-a658-22abcd47a5ca",
  pageTypeSlug: "car-year",
  slug: "lamborghini-revuelto-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 Revuelto: largely a carryover from the launch MY2024 model. No mechanical changes to the 1,001 hp V12 + 3-motor + 3.8 kWh PHEV powertrain. Pricing inched up modestly. Two NHTSA recalls landed on MY24/MY25 units during the MY25 sales window (Jul 2025 door gas-spring pin torque on 27 US units; Jan 2026 rearview-camera software defect). Sources: https://www.cars.com/research/lamborghini-revuelto-2025/ , https://www.cars.com/research/lamborghini-revuelto/recalls/",
  shortList: false,
  sources:
    "1. https://www.cars.com/research/lamborghini-revuelto-2025/\n2. https://www.kbb.com/lamborghini/revuelto/2025/specs/\n3. https://www.edmunds.com/lamborghini/revuelto/\n4. https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=48581\n5. https://www.cars.com/research/lamborghini-revuelto/recalls/",
  exclusionReason: "All trims excluded",
  carModelSlug: "lamborghini-revuelto",
} as const satisfies CarYear
