import type { CarYear } from "../car-year.page-type.ts"

export const porscheMacanElectric2025 = {
  id: "019e4af6-767f-724c-ad5d-1816779cba9e",
  pageTypeSlug: "car-year",
  slug: "porsche-macan-electric-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    'First model year for the all-electric Macan in the US. PPE 800V platform. Initial launch trims: Macan ($75,300), Macan 4 ($78,800), Macan Turbo ($106,950). Macan 4S ($86,200) added late 2024 as a mid-lineup addition. EPA-rated range up to 308 mi (Macan RWD). New Porsche Driver Experience cabin layout (curved 12.6" driver display + 10.9" center + optional 10.9" passenger display + augmented-reality HUD optional). Driver-attention camera standard. Source: https://newsroom.porsche.com/en_US/products/macan/macan-electric-world-premiere-2024-35067.html',
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/macan/macan-electric-models/\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=47390\n- https://www.caranddriver.com/porsche/macan-electric/specs/2025/",
  exclusionReason: "All trims excluded",
  carModelSlug: "porsche-macan-electric",
} as const satisfies CarYear
