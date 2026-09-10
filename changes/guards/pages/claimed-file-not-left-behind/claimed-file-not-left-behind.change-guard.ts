import type { ChangeGuard } from "../../change-guard.page-type.types.ts"

export const claimedFileNotLeftBehind = {
  id: "01a07988-b667-79dc-8556-31aaf0e2c112",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "claimed-file-not-left-behind",
  changeTargetType: "change-target-type/file",
  definition:
    "the guard refusing an answer leaving a page's path and leaving behind a file that page claims",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The page an answer leaves a path without is read from the world before that answer.",
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
      statement: "A file the page claims with a body after the answer refuses that answer.",
    },
    {
      invariantKind: "departure",
      statement: "A file a page after the answer claims is no file left behind.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages claim a file after the answer is read from the index that answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the page gone from its path and the file left behind.",
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
    {
      invariantKind: "departure",
      statement: "A page a move carried off is judged as a page taken away.",
    },
  ],
} as const satisfies ChangeGuard
