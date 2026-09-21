import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueImageManagement = {
  id: "01a0c505-ddbf-7d4f-bf21-7231bba0728f",
  type: "page-type/initiative",
  slug: "nimue-image-management",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [],
  constraints: [
    "An image's bytes are a file property akasha does not commit, and the image's page is committed.",
  ],
} as const satisfies Initiative
