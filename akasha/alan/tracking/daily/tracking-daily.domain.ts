import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const trackingDaily = {
  id: "01a062dc-1b7f-7c99-a886-e67035171fdf",
  pageTypeSlug: "domain",
  slug: "tracking-daily",
  definition: "what is measured about Alan a day at a time",
  partSlugs: [
    "page-type/email-entry",
    "page-type/eso-day",
    "page-type/wake-day",
    "module/day-figures",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wake day is the day Alan lives and an ESO day is the day Alan plays.",
    },
    {
      invariantKind: "departure",
      statement: "The page tracked is a day and the page type says which kind of day.",
    },
  ],
} as const satisfies Domain
