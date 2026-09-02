import type { Module } from "@akasha/code-system/module"

export const accountPicker = {
  id: "01a063af-ee63-7fa9-bca2-74c7c61561a7",
  pageTypeSlug: "module",
  slug: "account-picker",
  definition: "the account a gateway sends the next request under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pick asks the effects for the best credential.",
    },
    {
      invariantKind: "departure",
      statement: "A pick answers the account the chosen credential names.",
    },
    {
      invariantKind: "departure",
      statement: "A pick the effects answer no credential to answers no account.",
    },
    {
      invariantKind: "departure",
      statement: "An account named as a string is excluded from the choice.",
    },
    {
      invariantKind: "departure",
      statement: "A set of accounts handed in is excluded from the choice as handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A pick handed no exclude excludes no account.",
    },
    {
      invariantKind: "departure",
      statement: "A pick asked for while a pick is in flight is answered by the pick in flight.",
    },
    {
      invariantKind: "departure",
      statement: "The pick in flight is let go once that pick settles.",
    },
    {
      invariantKind: "departure",
      statement: "A pick that throws lets the pick in flight go.",
    },
    {
      invariantKind: "departure",
      statement: "A pick that throws is thrown on to the caller.",
    },
    {
      invariantKind: "departure",
      statement: "The first account picked is written about as a bind.",
    },
    {
      invariantKind: "departure",
      statement: "An account picked after another account is written about as a rebind.",
    },
    {
      invariantKind: "departure",
      statement: "A rebind line names the account picked before that rebind.",
    },
    {
      invariantKind: "departure",
      statement: "A line names the excludes where the choice excluded an account.",
    },
    {
      invariantKind: "departure",
      statement: "The account picked again is written about no second time.",
    },
    {
      invariantKind: "departure",
      statement: "Every line written here goes to a door the caller may replace.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller holds one picker for as long as the account picked is to be remembered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renews a credential.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers the token the chosen account holds.",
    },
    {
      invariantKind: "gap",
      statement: "A pick in flight answers a caller whose excludes that pick never read.",
    },
    {
      invariantKind: "gap",
      statement: "The account picked before is remembered through a pick that answered nothing.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here picks again when the account picked is refused upstream.",
    },
    {
      invariantKind: "gap",
      statement: "The log prefix is handed in once while the effects take that prefix each call.",
    },
  ],
} as const satisfies Module
