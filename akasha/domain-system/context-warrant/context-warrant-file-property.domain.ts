import type { Domain } from "../domain/domain.page-type.ts"

export const contextWarrantFileProperty = {
  id: "01a04db3-d595-766c-a861-6018f0e43994",
  pageTypeSlug: "domain",
  slug: "context-warrant-file-property",
  definition: "what a seat must read for the properties the page states",
  design: [
    {
      invariantKind: "departure",
      statement: "A page warrants the page property type of every property it states.",
    },
    {
      invariantKind: "departure",
      statement: "A page warrants nothing for a property it does not state.",
    },
  ],
} as const satisfies Domain
