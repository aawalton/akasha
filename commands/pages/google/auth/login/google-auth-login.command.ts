import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleAuthLogin = {
  id: "01a08cd6-dec8-70d0-806a-01701518ada0",
  type: "command",
  slug: "google-auth-login",
  definition:
    "the command granting the consent Google is reached as Alan on, for calendar, drive and mail",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--callback-url <url>",
      takes:
        "the callback URL pasted from the browser, where the loopback listener cannot be reached",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The token minted is written into `~/.secrets.env`.",
    },
    {
      invariantKind: "departure",
      statement: "The token is read from `GOOGLE_OAUTH_REFRESH_TOKEN`.",
    },
    {
      invariantKind: "departure",
      statement: "The older token a product had is read only where that name has no value.",
    },
    {
      invariantKind: "departure",
      statement: "The scopes asked for are every scope calendar, drive and mail read between them.",
    },
    {
      invariantKind: "departure",
      statement: "One token is minted, and calendar, drive and mail all read that token.",
    },
    {
      invariantKind: "departure",
      statement: "The token minted is saved rather than left for whoever ran this to save.",
    },
    {
      invariantKind: "absence",
      statement: "The token's value reaches neither the report nor a log.",
    },
  ],
  name: "login",
} as const satisfies Command
