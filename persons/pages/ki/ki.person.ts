import type { Person } from "akasha/persons/person.page-type.types.ts"

export const ki = {
  id: "01a053fe-00f2-7278-a312-a9d344de7526",
  type: "person",
  slug: "ki",
  definition: "Ki Goff, Alan's sister-in-law",
  answeredBy: "amy",
  phone: "+18015028196",
  supabaseAuthUserId: "395db962-77dd-4aa7-b1c2-6500025dc331",
  parts: [
    "page-type/ki-author",
    "page-type/ki-book",
    "page-type/ki-book-series",
    "page-type/ki-collection-template",
    "page-type/ki-episode",
    "page-type/ki-franchise",
    "page-type/ki-movie",
    "page-type/ki-season",
    "page-type/ki-show",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages Ki keeps here are reached by Ki alone among the people outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A page type here serves Ki as the matching page type of Alan's serves Alan.",
    },
  ],
} as const satisfies Person
