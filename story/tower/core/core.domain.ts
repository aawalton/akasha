import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const core = {
  id: "01a05bc6-fa4a-7000-bf9b-15c368be5c0a",
  pageTypeSlug: "domain",
  slug: "core",
  definition: "the shapes a tower game's characters, floors and saved state are stored in",
  partSlugs: [
    "module/character-schema",
    "module/floor-schema",
    "module/revealed-sheet",
    "module/tower-state",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches outside the value this package is handed.",
    },
    {
      invariantKind: "departure",
      statement: "Stored text becomes a value only by being parsed against a shape here.",
    },
    {
      invariantKind: "departure",
      statement: "A shape refusing its text throws rather than answering a partial value.",
    },
    {
      invariantKind: "departure",
      statement: "What a player is shown of a sheet is a shape of its own.",
    },
  ],
} as const satisfies Domain
