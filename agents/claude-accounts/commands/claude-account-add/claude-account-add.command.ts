import type { Command } from "@akasha/command-system/command"

export const claudeAccountAdd = {
  id: "01a06861-b463-721b-87be-fcc7f5294e4b",
  pageTypeSlug: "command",
  slug: "claude-account-add",
  definition:
    "the command filing a page for a claude account and giving it the next free alias slot",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<account>", takes: "the name the account is to be reached by" },
    { said: "--email <address>", takes: "the address the account signs in as" },
    { said: "--alias <n>", takes: "the alias slot to take, where the next free one is not wanted" },
  ],
  helpNotes: [
    "the slot is the highest one any account page states, and one more, so the slots stay in the order the accounts were added.",
    "an account whose page already stands is refused rather than written over.",
    "only the name, the address and the slot are written: the uuid, the plan, the band, the renewal day and the scopes are all answered by the first sign-in.",
    "the tokens are held beside the page rather than in it, so a page written here signs in nowhere until /login is run in the launching session.",
    "the shell composes a `c<N>` launcher for each account page, so a page written here reaches a terminal that composes its set again.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call files one account.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose page stands is refused rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "The slot is one above the highest any page states, unless a slot is named.",
    },
    {
      invariantKind: "departure",
      statement: "A slot another account holds is refused rather than shared.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is minted as a uuid version 7.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signs in, reads a token, or writes a secret.",
    },
  ],
} as const satisfies Command
