import type { Module } from "@akasha/code/module"

export const pushRegisterBody = {
  id: "01a05b54-a907-7932-8f8a-8aed5987a345",
  pageTypeSlug: "module",
  type: "module",
  slug: "push-register-body",
  definition: "the body the push registration route takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body with no token is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The only platform named is iOS.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying anything beyond the token and the platform is refused.",
    },
  ],
} as const satisfies Module
