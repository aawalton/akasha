import type { Command } from "akasha/commands/command.page-type.types.ts"

export const claudeAccountAdd = {
  id: "01a06861-b463-721b-87be-fcc7f5294e4b",
  type: "command",
  slug: "claude-account-add",
  definition:
    "the command filing a page for a claude account and giving it the next free alias slot",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<account>", takes: "the name the account is to be reached by" },
    { said: "--email <address>", takes: "the address the account signs in as" },
    { said: "--alias <n>", takes: "the alias slot to take, where the next free one is not wanted" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the name, the address and the slot are written onto the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The plan, the band, the renewal day and the scopes are answered by the first sign-in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page written here signs in nowhere until `/login` runs in the launching session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A launcher for a page written here is there only in a terminal composing its set again.",
    },
    {
      invariantKind: "departure",
      statement: "One call files one account.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose page exists is refused rather than written over.",
    },
    {
      invariantKind: "departure",
      statement:
        "The slot is a step above the highest slot any page states unless a slot is named.",
    },
    {
      invariantKind: "departure",
      statement: "A slot another account has is refused rather than shared.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is minted as a uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "A page composed names its type from the root rather than by a relative path.",
    },
    {
      invariantKind: "departure",
      statement: "The change adding a file writes the page rather than an edit composed here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signs in or reads a token or writes a secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folder a page is filed into is read off the account pages rather than spelled here.",
    },
  ],
  name: "add",
} as const satisfies Command
