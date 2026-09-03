import type { CarYear } from "../car-year.page-type.ts"

export const hyundaiIoniq52025 = {
  id: "019e4ae2-7912-7480-8afe-b461009d0b20",
  pageTypeSlug: "car-year",
  slug: "hyundai-ioniq-5-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    'First model year built at the new Hyundai Metaplant America (HMGMA) in Georgia, qualifying for $7,500 federal EV tax credit (until Sept 30, 2025). Added native NACS charging port (Tesla Supercharger access) as standard for non-N trims. New XRT trim added with rugged styling cues, 1" lift, and all-terrain-style tires. ICCU recall remedy applied. Sources: https://insideevs.com/news/758478/2025-hyundai-ioniq-5-tax-credit/ ; https://electrek.co/2025/05/04/its-back-hyundai-ioniq-5-qualifies-for-7500-tax-credit-again/',
  shortList: false,
  sources:
    "- https://www.hyundaiusa.com/us/en/vehicles/ioniq-5\n- https://insideevs.com/news/758478/2025-hyundai-ioniq-5-tax-credit/\n- https://electrek.co/2025/05/04/its-back-hyundai-ioniq-5-qualifies-for-7500-tax-credit-again/",
  exclusionReason: "All trims excluded",
  carModelSlug: "hyundai-ioniq-5",
} as const satisfies CarYear
