import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const throwawayUser = {
  id: "01a06583-0030-7003-b7d9-21d45fedb867",
  type: "module",
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
      invariantKind: "departure",
      statement: "A user made is named before the check that can refuse it, which comes after.",
    },
    {
      invariantKind: "departure",
      statement: "A password rotated is named as soon as Supabase has taken it.",
    },
    {
      invariantKind: "absence",
      statement: "The password itself is never named, only that one was rotated.",
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
