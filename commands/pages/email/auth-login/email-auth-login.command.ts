import type { Command } from "akasha/commands/command.page-type.types.ts"

export const emailAuthLogin = {
  id: "01a06810-cf11-7af8-af8d-36910776aabe",
  pageTypeSlug: "command",
  type: "command",
  slug: "email-auth-login",
  definition: "the command minting the Gmail refresh token at a browser consent",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--callback-url <url>",
      takes: "the URL pasted back where the browser cannot reach the loopback",
    },
  ],
  helpNotes: [
    "the consent URL is written to the error stream to be opened in a browser, and the redirect is caught on a loopback port.",
    "the token is written into `~/.secrets.env`, which every shell started from here reads.",
    "the token is bound to the read, compose and modify scopes asked for at consent.",
    "a browser that cannot reach the loopback is finished by re-running with the URL copied from the address bar.",
    "GOOGLE_GMAIL_OAUTH_CLIENT_ID and GOOGLE_GMAIL_OAUTH_CLIENT_SECRET are both required here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refresh token is minted for reading and composing and modifying alike.",
    },
    {
      invariantKind: "departure",
      statement: "A consent no loopback can receive is finished from the URL pasted back.",
    },
    {
      invariantKind: "departure",
      statement: "A minted refresh token is written into the workstation's secrets file.",
    },
    {
      invariantKind: "absence",
      statement: "No refresh token is read from the environment here.",
    },
  ],
} as const satisfies Command
