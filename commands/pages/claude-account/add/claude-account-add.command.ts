import type { Command } from "akasha/commands/command.page-type.types.ts"

export const claudeAccountAdd = {
  id: "01a06861-b463-721b-87be-fcc7f5294e4b",
  type: "command",
  slug: "claude-account-add",
  definition:
    "the command filing a page for a claude account and giving it the next free alias slot",
  code: "ts",
  test: "ts",
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
      statement: "The page itself is composed and landed by `module/claude-account-making`.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw after the commit landed names that commit in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A run that refused after the commit landed names that commit in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw before the commit landed is refused as the fault alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw carries the kind of fault the throw names.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
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
  arguments: [
    { argument: "argument/account", required: true, saidAs: "word" },
    { argument: "argument/email", required: true },
    { argument: "argument/alias" },
  ],
} as const satisfies Command
