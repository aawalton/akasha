import type { Module } from "@akasha/code-system/module"

export const slugRenaming = {
  id: "01a062ac-e1ef-7c47-b6b2-5941424c5cd2",
  pageTypeSlug: "module",
  slug: "slug-renaming",
  definition: "the pair a page slug rename carries, worked out from the address the page is at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is named by the address the page is at rather than by its slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "One slug is carried under many page types.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's slug is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a page type names the act that renames a page type.",
    },
    {
      invariantKind: "departure",
      statement: "An address no page answers is refused rather than renamed to nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An address more than one page answers is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A file arriving under the new slug keeps the tail that file already carries.",
    },
    {
      invariantKind: "departure",
      statement: "The flags a call said are carried on but for the two naming the page.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying no message is carried on with a message naming the rename.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index or the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here carries a file and nothing here writes a file.",
    },
  ],
} as const satisfies Module
