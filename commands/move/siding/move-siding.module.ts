import type { Module } from "@akasha/code-system/module"

export const moveSiding = {
  id: "01a07208-15d9-7ea4-b255-645f2d052aa0",
  pageTypeSlug: "module",
  slug: "move-siding",
  definition: "the pairs of paths a move carries, worked out from the pairs a call named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pair is read against the repository root, and one side outside it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A pair naming one path on both sides is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A source that is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A source that is no file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A destination already holding a body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path named as the source of more than one pair is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path named as the destination of more than one pair is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file's own name says whether a page claims that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name is a page's own file where the page type slot names a page type and no section follows.",
    },
    {
      invariantKind: "departure",
      statement: "A name carrying a section past a known page type is a file beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A name whose page type slot names no page type is neither.",
    },
    {
      invariantKind: "departure",
      statement: "A name the grammar will not parse is neither.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is neither is carried under whatever name a pair gives it.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page is refused a new name.",
    },
    {
      invariantKind: "departure",
      statement: "The page that refusal names is read from the file's own name.",
    },
    {
      invariantKind: "constraint",
      statement: "The index is asked which page types there are and nothing else about a path.",
    },
    {
      invariantKind: "departure",
      statement: "A page's id is read from the index only where a pair gives that page a new name.",
    },
    {
      invariantKind: "departure",
      statement: "An index that will not say what the page types are refuses the pair.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page is carried only where a pair names that page's own file.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside what is named arrives in the folder that named file arrives in.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose name reserves it uncommitted is answered as no commit carrying it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
