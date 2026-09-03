import type { CarYear } from "../car-year.page-type.ts"

export const teslaCybertruck2025 = {
  id: "019e4af9-67d2-7dd1-ad17-b06f44205f5c",
  pageTypeSlug: "car-year",
  slug: "tesla-cybertruck-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 Cybertruck saw Tesla drop the originally planned RWD entry-level trim (was $60,990, scheduled for 2025) — only AWD Dual Motor (~$79,990, 325mi) and Cyberbeast tri-motor (~$99,990, 301mi) remained mid-2025. Tesla cut Cybertruck prices substantially late 2024/early 2025 after demand fell short of expectations. Major recall: March 2025 cant-rail stainless-steel trim delamination recall covering all 46,096 Cybertrucks built through Feb 27 2025. Earlier MY2024 accelerator-pedal-pad recall (April 2024) affected all units built Nov 2023-Apr 2024. Sources: https://en.wikipedia.org/wiki/Tesla_Cybertruck , https://electrek.co/2025/03/20/tesla-recalls-all-cybertrucks-ever-made-over-trim-falling-off/ , https://www.tesla.com/support/recall-cybertruck-accelerator-pedal-pad",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/Tesla_Cybertruck\n- https://electrek.co/2025/03/20/tesla-recalls-all-cybertrucks-ever-made-over-trim-falling-off/\n- https://www.tesla.com/support/recall-cybertruck-accelerator-pedal-pad\n- https://recharged.com/articles/2025-tesla-cybertruck-recalls-list\n- https://www.edmunds.com/tesla/cybertruck/2025/features-specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "tesla-cybertruck",
} as const satisfies CarYear
