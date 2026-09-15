import type { Command } from "akasha/command/command.page-type.types.ts"

export const modelAccountAdd = {
  id: "01a06861-b463-721b-87be-fcc7f5294e4b",
  type: "command",
  slug: "model-account-add",
  definition:
    "the command filing a page for a model account and giving it the next free alias slot",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the name, the address and the slot are written onto the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The plan, the band, the renewal day and the scopes are answered by the first sign-in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page written here signs in nowhere until `/login` runs in the launching session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A launcher for a page written here is there only in a terminal composing its set again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call files one account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account whose page exists is refused rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The slot is a step above the highest slot any page states unless a slot is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slot another account has is refused rather than shared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's identity is minted as a uuid version 7.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page itself is composed and landed by `module/model-account-making`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw after the commit landed names that commit in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that refused after the commit landed names that commit in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw before the commit landed is refused as the fault alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw carries the kind of fault the throw names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here signs in or reads a token or writes a secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The folder a page is filed into is read off the account pages rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address the call does not say is the account's own name at `alanwalton.com`.",
    },
  ],
  name: "add",
  arguments: [
    { argument: "argument/account", required: true, saidAs: "word" },
    { argument: "argument/email" },
    { argument: "argument/alias" },
  ],
} as const satisfies Command
