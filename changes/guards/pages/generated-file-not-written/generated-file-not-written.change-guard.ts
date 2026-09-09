import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const generatedFileNotWritten = {
  id: "01a087ae-be91-76cb-aee3-043c099c6ea2",
  pageTypeSlug: "change-guard",
  slug: "generated-file-not-written",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing a change to the content of a file a generated property has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change to the content of a file a generated property has refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "No edit but a change to a file's content is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A path no generated property has is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A section under a page type carrying no such property is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file added is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file taken away is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a path is generated is read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the path judged.",
    },
    {
      invariantKind: "departure",
      statement: "The first path judged generated gives the reason.",
    },
    {
      invariantKind: "departure",
      statement: "A generated file travels with the page claiming that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A move in the answer carrying a generated file onto a path passes that path over.",
    },
    {
      invariantKind: "departure",
      statement: "A move onto that path from a path no generated property has passes nothing over.",
    },
    {
      invariantKind: "gap",
      statement:
        "A move onto such a path answering no change of content is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index on disk.",
    },
  ],
} as const satisfies ChangeGuard
