import type { CarYear } from "../car-year.page-type.ts"

export const bmwIx2025 = {
  id: "019e4add-f16d-75e2-bc96-6d5335c7cf25",
  pageTypeSlug: "car-year",
  slug: "bmw-ix-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 iX continues the original launch lineup with xDrive50 and M60 trims. The xDrive45 was not yet available in MY2025. xDrive50 EPA range up to 309 mi; M60 up to 280 mi. Battery 105 kWh usable on xDrive50, 106.3 kWh on M60. MSRPs roughly $87,250 (xDrive50) and $111,500 (M60), plus $1,175 destination.\n\nSources:\n- https://www.jdpower.com/cars/2026/bmw/ix (historical comparison)\n- https://www.kbb.com/bmw/ix/",
  shortList: false,
  sources:
    "- KBB — https://www.kbb.com/bmw/ix/\n- US News — https://cars.usnews.com/cars-trucks/bmw/ix",
  exclusionReason: "All trims excluded",
  carModelSlug: "bmw-ix",
} as const satisfies CarYear
