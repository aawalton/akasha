import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const pageEdge = {
  id: "01a049e9-651c-7005-9845-75ac1a5fb3a0",
  pageTypeSlug: "domain",
  slug: "page-edge",
  definition: "a reference from one page to another",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An edge is an import where the target is needed to derive this page's type.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is a slug everywhere else.",
    },
    {
      invariantKind: "departure",
      statement: "Every import edge is a slug property as well.",
    },
    {
      invariantKind: "departure",
      statement: "A slug edge is checked for its shape and never for what it names.",
    },
    {
      invariantKind: "departure",
      statement: "An edge imports only a type.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is gone before the page runs.",
    },
  ],
} as const satisfies Domain
