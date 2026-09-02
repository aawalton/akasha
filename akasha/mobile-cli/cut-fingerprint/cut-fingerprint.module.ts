import type { Module } from "@akasha/code-system/module"

export const cutFingerprint = {
  id: "01a05fab-665d-7f4c-bb6b-46467c1b1df8",
  pageTypeSlug: "module",
  slug: "cut-fingerprint",
  definition: "the fingerprint a taken cut is remembered by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The mobile-cut pages here are markdown files under pages/mobile-cut at the checkout root.",
    },
    {
      invariantKind: "absence",
      statement: "The page store is not asked for a `mobile-cut`.",
    },
    {
      invariantKind: "departure",
      statement: "The last cut is the `mobile-cut` page carrying the highest build number.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fingerprint carrying no build input tree hash predates the basis cuts are judged by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cut is owed where the current build input tree hash differs from the last cut's.",
    },
    {
      invariantKind: "departure",
      statement: "A newest cut page that will not parse raises rather than reading as no cut.",
    },
    {
      invariantKind: "departure",
      statement: "An app with no `mobile-cut` page reads as no cut rather than raising.",
    },
    {
      invariantKind: "departure",
      statement: "A taken cut is filed as the `mobile-cut` page named for its app and its build.",
    },
    {
      invariantKind: "departure",
      statement: "A filed cut carries the id the cut's own address yields rather than a minted id.",
    },
    {
      invariantKind: "departure",
      statement: "A cut without a shell sha leaves the shell sha key off the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cut without a build input tree hash leaves the build input tree hash key off the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page no commit took raises rather than answering as filed.",
    },
  ],
} as const satisfies Module
