import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthRefreshToken = {
  id: "01a08cd5-c0c5-7e94-b221-4d20b68a9ce6",
  type: "page-type/module",
  slug: "oauth-refresh-token",
  definition: "a Google call's credentials",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One consent mints one token, and calendar, drive and mail all read that token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token minted for one product alone is read where the shared token is unset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The token is read from the environment at the moment the token is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The app's own id and secret are answered beside the token as one credential set.",
    },
  ],
} as const satisfies Module
