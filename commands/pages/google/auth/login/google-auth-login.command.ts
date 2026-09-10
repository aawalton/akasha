import type { Command } from "../../../../command.page-type.types.ts"

export const googleAuthLogin = {
  id: "01a08cd6-dec8-70d0-806a-01701518ada0",
  pageTypeSlug: "command",
  type: "command",
  slug: "google-auth-login",
  definition: "the consent Google is reached as Alan on, granted once for calendar, drive and mail",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--callback-url <url>",
      takes:
        "the callback URL pasted from the browser, where the loopback listener cannot be reached",
    },
  ],
  helpNotes: [
    "one consent covers the calendar, drive and mail scopes together, and one token comes of it.",
    "the minted refresh token is written to stdout by the consent round trip rather than answered here.",
    "the token is read from `GOOGLE_OAUTH_REFRESH_TOKEN`, which stands ahead of the older token each product had.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The scopes asked for are every scope calendar, drive and mail read between them.",
    },
    {
      invariantKind: "departure",
      statement: "One token is minted, and calendar, drive and mail all read that token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the token anywhere.",
    },
  ],
} as const satisfies Command
