import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const oauthRefreshToken = {
  id: "01a08cd5-c0c5-7e94-b221-4d20b68a9ce6",
  type: "module",
  slug: "oauth-refresh-token",
  definition: "the credentials a Google call is made with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One consent mints one token, and calendar, drive and mail all read that token.",
    },
    {
      invariantKind: "departure",
      statement: "A token minted for one product alone is read where the shared token is unset.",
    },
    {
      invariantKind: "departure",
      statement: "The token is read from the environment at the moment the token is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The app's own id and secret are answered beside the token as one credential set.",
    },
  ],
} as const satisfies Module
