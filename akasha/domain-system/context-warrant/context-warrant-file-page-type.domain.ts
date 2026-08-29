import type { Domain } from "../domain/domain.page-type.ts"

export const contextWarrantFilePageType = {
  id: "01a04db3-d595-78e5-b6a1-9a655877cc77",
  pageTypeSlug: "domain",
  slug: "context-warrant-file-page-type",
  definition: "what a seat must read for the type of the page it changes",
  design: [
    {
      invariantKind: "departure",
      statement: "A page warrants its page type and every type that one extends.",
    },
  ],
} as const satisfies Domain
