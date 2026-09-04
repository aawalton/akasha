import type { Role } from "../role.page-type.ts"

export const interviewer = {
  id: "01a053c5-8d2b-7d78-bf41-4e1a994fe61f",
  pageTypeSlug: "role",
  slug: "interviewer",
  definition: "an agent drawing out what one person knows, in their own words",
  onCall: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This role's input is a person rather than a document.",
    },
    {
      invariantKind: "departure",
      statement: "This role writes domains and never the record.",
    },
  ],
} as const satisfies Role
