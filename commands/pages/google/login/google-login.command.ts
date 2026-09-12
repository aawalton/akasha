import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleLogin = {
  id: "01a08cd6-dec8-70d0-806a-01701518ada0",
  type: "command",
  slug: "google-login",
  definition:
    "the command granting the consent Google is reached as Alan on, for calendar, drive and mail",
  code: "ts",
  test: "ts",
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
    {
      invariantKind: "departure",
      statement:
        "A login refused after the code reached Google says that code is spent and consent is asked again.",
    },
    {
      invariantKind: "departure",
      statement: "A login refused before the code reached Google is refused as the fault alone.",
    },
  ],
  name: "login",
  arguments: [{ argument: "argument/callback-url" }],
} as const satisfies Command
