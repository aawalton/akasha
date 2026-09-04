import type { CarYear } from "../car-year.page-type.ts"

export const lexusNx2025 = {
  id: "019e4ae8-2b8e-770a-bcc1-64c4c1937b81",
  pageTypeSlug: "car-year",
  slug: "lexus-nx-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 NX carries over the 2nd-gen design with minor trim/equipment updates. NX 350h hybrid and NX 450h+ PHEV continue. PHEV remains eligible for partial federal tax credit (PHEV is assembled in Japan but with phase-out limitations - check IRS for current eligibility). Source: https://www.lexus.com/models/NX/2025",
  shortList: false,
  sources: "- Lexus 2025 NX: https://www.lexus.com/models/NX\n- EPA fueleconomy.gov",
  exclusionReason: "All trims excluded",
  carModelSlug: "lexus-nx",
} as const satisfies CarYear
