import type { Module } from "../../code-system/modules/module.page-type.ts"

export const throwawayUser = {
  id: "01a06583-0030-7003-b7d9-21d45fedb867",
  pageTypeSlug: "module",
  slug: "throwaway-user",
  definition: "a user the service role makes by email, with the password the user was made with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A user already there is answered rather than made again.",
    },
    {
      invariantKind: "departure",
      statement: "A password nobody named is minted from twenty-four random bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A new user's email is confirmed at the moment the user is made.",
    },
    {
      invariantKind: "departure",
      statement: "Two emails are canonical seeded identities rather than throwaways.",
    },
    {
      invariantKind: "departure",
      statement: "Rotating a canonical identity's password is refused until the caller says why.",
    },
    {
      invariantKind: "departure",
      statement: "A user outside the paths credentials are allowed for is refused.",
    },
    {
      invariantKind: "absence",
      statement: "No password reaches a browser from here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a password to a file.",
    },
  ],
} as const satisfies Module
