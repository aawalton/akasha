import type { CarYear } from "../car-year.page-type.ts"

export const rivianR1s2026 = {
  id: "019e4afa-5420-753c-b0af-a8a5b4b3c3d0",
  pageTypeSlug: "car-year",
  slug: "rivian-r1s-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 carries the Gen-2 R1S forward with: (1) native NACS (SAE J3400) charge port replacing CCS1 — Tesla Superchargers reachable without an adapter; (2) modest ~$1k price bumps across trims; (3) IIHS Top Safety Pick+ award (the only large SUV from a US automaker to win TSP+ in 2026); (4) 2026.07 OTA cutting 10-80% DC fast-charge time further. Rivian is phasing out Dual Standard ahead of the R2 launch but it remained orderable in early MY2026. Sources: https://theweeklydriver.com/2026/04/2026-rivian-r1s-buyer-guide/ ; https://www.consumerreports.org/cars/rivian/r1s/2026/ratings-specs/ ; https://riviantrackr.com/news/rivians-2026-07-software-update-delivers-a-major-dc-fast-charging-improvement/",
  shortList: false,
  sources:
    "- https://rivian.com/r1s\n- https://www.edmunds.com/rivian/r1s/\n- https://theweeklydriver.com/2026/04/2026-rivian-r1s-buyer-guide/\n- https://www.cargurus.com/research/articles/2026-rivian-r1s-pricing-specs-release-date\n- https://www.consumerreports.org/cars/rivian/r1s/2026/ratings-specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "rivian-r1s",
} as const satisfies CarYear
