import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountIdentity = {
  id: "01a0686b-604a-7000-a940-38d8a7a13399",
  type: "page-type/module",
  slug: "model-account-identity",
  definition: "which upstream account a credential belongs to, and pinning a page to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The identity of a credential is the account uuid the profile probe answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A profile probe is given 750 milliseconds to answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A probe answered with anything but success throws saying the status and a summary of the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body summarized is collapsed onto one line and cut at 200 characters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A profile body the profile shape refuses throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A profile naming no email reads as an identity with no email.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A credential belonging to an upstream account another model-account is pinned to is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A model-account pinned to no upstream account takes the account that model-account resolves to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A credential resolving to the upstream account already pinned is a match.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A credential resolving to another upstream account is refused unless the caller allows a rebind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rebind names the upstream account moved off as well as the account moved to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys a rebind clears are the keys one upstream account's readings fill.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A pin moving a page off an upstream account clears those keys and drops every value beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pin writes its credential through the credential push.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push refused or finding no page refuses the pin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push answered as stale still pins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page stating an upstream account other than the account handed in refuses the pin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the stage the pin stopped at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Writing a pin answers with an outcome rather than throwing.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The repository root reaches this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The reading of the index and the reader of page bodies reach this module as parameters.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The doors the credential push opens reach this module as a parameter.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the uuid a page is pinned to.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Deciding a pin reads no page and no clock and no network.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here logs.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A page stating no upstream account refuses every pin.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A pin that clears the previous account's readings and then fails leaves those readings cleared.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A rebind drops the values beside the page that belong to no upstream account.",
    },
  ],
} as const satisfies Module
