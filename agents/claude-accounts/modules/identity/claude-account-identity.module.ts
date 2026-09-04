import type { Module } from "@akasha/code-system/module"

export const claudeAccountIdentity = {
  id: "01a0686b-604a-7000-a940-38d8a7a13399",
  pageTypeSlug: "module",
  slug: "claude-account-identity",
  definition: "which upstream account a credential belongs to, and pinning a page to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The identity of a credential is the account uuid the profile probe answers.",
    },
    {
      invariantKind: "departure",
      statement: "A profile probe is given 750 milliseconds to answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A probe answered with anything but success throws, saying the status and a summary of the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body summarized is collapsed onto one line and cut at 200 characters.",
    },
    {
      invariantKind: "departure",
      statement: "A profile body the profile shape refuses throws.",
    },
    {
      invariantKind: "departure",
      statement: "A profile naming no email reads as an identity with no email.",
    },
    {
      invariantKind: "departure",
      statement:
        "A credential belonging to an upstream account another claude-account is pinned to is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A claude-account pinned to no upstream account takes the one it resolves to.",
    },
    {
      invariantKind: "departure",
      statement: "A credential resolving to the upstream account already pinned is a match.",
    },
    {
      invariantKind: "departure",
      statement:
        "A credential resolving to another upstream account is refused unless the caller allows a rebind.",
    },
    {
      invariantKind: "departure",
      statement: "A rebind names the upstream account moved off as well as the one moved to.",
    },
    {
      invariantKind: "departure",
      statement: "The keys a rebind clears are the ones one upstream account's readings fill.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pin moving a page off an upstream account clears those keys and drops every value beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A pin writes its credential through the credential push.",
    },
    {
      invariantKind: "departure",
      statement: "A push refused and a push finding no page both refuse the pin.",
    },
    {
      invariantKind: "departure",
      statement: "A push answered as stale still pins.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating an upstream account other than the one handed in refuses the pin.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the stage the pin stopped at.",
    },
    {
      invariantKind: "departure",
      statement: "Writing a pin answers with an outcome rather than throwing.",
    },
    {
      invariantKind: "constraint",
      statement: "The repository root reaches this module as a parameter.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The reading of the index and the reader of page bodies reach this module as parameters.",
    },
    {
      invariantKind: "constraint",
      statement: "The doors the credential push opens reach this module as a parameter.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the uuid a page is pinned to.",
    },
    {
      invariantKind: "absence",
      statement: "Deciding a pin reads no page, no clock and no network.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here logs.",
    },
    {
      invariantKind: "gap",
      statement: "A page stating no upstream account refuses every pin.",
    },
    {
      invariantKind: "gap",
      statement:
        "A pin that clears the previous account's readings and then fails leaves them cleared.",
    },
    {
      invariantKind: "gap",
      statement: "A rebind drops the values beside the page that belong to no upstream account.",
    },
  ],
} as const satisfies Module
