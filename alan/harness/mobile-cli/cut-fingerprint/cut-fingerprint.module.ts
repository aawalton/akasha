import type { Module } from "@akasha/code/module"

export const cutFingerprint = {
  id: "01a05fab-665d-7f4c-bb6b-46467c1b1df8",
  pageTypeSlug: "module",
  type: "module",
  slug: "cut-fingerprint",
  definition: "the fingerprint a taken cut is remembered by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every `mobile-cut` page is a TypeScript page in a folder of its own inside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "A cut page's folder is named for that cut's slug.",
    },
    {
      invariantKind: "departure",
      statement: "The folder the cuts sit in is read off the cuts already filed.",
    },
    {
      invariantKind: "departure",
      statement: "No cut filed at all raises rather than answering a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A cut source that cannot be read raises rather than reading as no cut taken.",
    },
    {
      invariantKind: "absence",
      statement: "The page store is not asked for a `mobile-cut`.",
    },
    {
      invariantKind: "departure",
      statement: "The last cut is the `mobile-cut` page with the highest build number.",
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
      statement:
        "The change adding a file files the fingerprint rather than an edit composed here.",
    },
    {
      invariantKind: "departure",
      statement: "A filed cut mints its own id rather than deriving an id from where that cut is.",
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
