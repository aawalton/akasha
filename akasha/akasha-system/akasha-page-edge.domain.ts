import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaPageEdge = {
  id: "01a049e9-651c-7005-9845-75ac1a5fb3a0",
  slug: "akasha-page-edge",
  definition: "a reference from one page to another",
  design: [
    "An edge is an import where the target is needed to derive this page's type, and a slug everywhere else.",
    "Every import edge is a slug property as well.",
    "A slug edge is checked for its shape and never for what it names.",
    "An edge imports only a type, and is gone before the page runs.",
  ],
} as const satisfies Domain
