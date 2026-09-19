import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueAuth = {
  id: "01a0b79c-3c98-78fe-97c4-784d7dc13174",
  type: "page-type/initiative",
  slug: "nimue-auth",
  domain: "domain/auth",
  persona: "persona/nimue",
  intentStack: [
    { statement: "Anyone makes an account at alanwalton.com, and that account is a contributor." },
    { statement: "A contributor signs in with Google, with Discord or with Apple." },
    { statement: "Nothing at alanwalton.com signs a person in with a password." },
    { statement: "Every site Alan runs signs a person in the way alanwalton.com does." },
    { statement: "No GoTrue issues a token for anything Alan runs." },
    { statement: "Nothing Alan runs keeps anything in Postgres." },
  ],
} as const satisfies Initiative
