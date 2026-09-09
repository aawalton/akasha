import type { Domain } from "../../../domains/domain.page-type.ts"

export const statusBarAccess = {
  id: "01a05c9d-4096-7000-9ca0-5ff9f4e38802",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "status-bar-access",
  definition: "a day's cardio reading, drawn from the health samples a watch recorded",
  parts: ["module/session-reading"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller states the day and the span the reading covers.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a reading's meaning or what color the reading draws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store itself.",
    },
  ],
} as const satisfies Domain
