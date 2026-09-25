import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const wanderingInn = {
  id: "01a0d940-c72d-79a0-ba01-89944c0dc94c",
  type: "page-type/domain",
  slug: "wandering-inn",
  definition: "a page for each chapter of The Wandering Inn",
  parts: [
    "module/chapter",
    "module/chapter-filing",
    "module/site",
    "module/syncing",
    "service-workstation/wandering-inn-sync",
  ],
} as const satisfies Domain
