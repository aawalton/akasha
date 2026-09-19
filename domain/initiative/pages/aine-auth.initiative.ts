import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineAuth = {
  id: "01a0b79c-3c98-78fe-97c4-784d7dc13174",
  type: "page-type/initiative",
  slug: "aine-auth",
  domain: "domain/auth",
  persona: "persona/aine",
  intentStack: [
    { statement: "Anyone makes an account at alanwalton.com, and that account is a contributor." },
    { statement: "A contributor signs in at alanwalton.com with Google or with Discord." },
    { statement: "Nothing at alanwalton.com signs a person in with a password." },
  ],
} as const satisfies Initiative
