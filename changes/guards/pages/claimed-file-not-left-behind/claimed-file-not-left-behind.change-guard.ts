import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const claimedFileNotLeftBehind = {
  id: "01a07988-b667-79dc-8556-31aaf0e2c112",
  pageTypeSlug: "change-guard",
  slug: "claimed-file-not-left-behind",
  definition:
    "the guard refusing an answer taking a page away and leaving behind a file that page claims",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page an answer takes away is read from the world before that answer.",
    },
    {
      invariantKind: "departure",
      statement: "The files that page claims are read from that same world.",
    },
    {
      invariantKind: "departure",
      statement: "The page's own file is no file left behind.",
    },
    {
      invariantKind: "departure",
      statement: "A file the page claims holding a body after the answer refuses that answer.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the page taken away and the file left behind.",
    },
    {
      invariantKind: "departure",
      statement: "Only a path the naming grammar reads as a page is judged here.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world before the answer names no page at is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the working tree or the index on disk.",
    },
  ],
} as const satisfies ChangeGuard
