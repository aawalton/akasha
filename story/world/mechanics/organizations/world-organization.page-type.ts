import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldOrganization = {
  id: "01a0dec4-bfa0-731d-8692-eb04301420a0",
  type: "page-type/page-type",
  slug: "world-organization",
  definition: "a group of people that acts as one in a world",
  pluralSlug: "organizations",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-26T17:30:31.200Z",
  updatedAt: "2026-09-26T17:30:35.000Z",
} as const satisfies PageType
