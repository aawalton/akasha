import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatFleet = {
  id: "01a09c4c-951f-79d4-a631-988b1c54b8eb",
  type: "page-type/domain",
  slug: "seat-fleet",
  definition: "all of the seats",
  parts: [
    "module/seat-by-name",
    "module/seat-children",
    "module/seat-facts",
    "module/seat-forest",
    "module/seat-forest-reading",
    "module/seat-handle",
    "module/seat-roster",
    "module/seat-work",
    "module/work-tree-drawn",
  ],
} as const satisfies Domain
