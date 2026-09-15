import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const collectionPartsUnderTheirPlural = {
  id: "01a0a5c5-2740-7002-a26e-a1c0c1a39ac1",
  type: "page-type/folder-shape",
  slug: "collection-parts-under-their-plural",
  definition: "the shape of a folder gathering under a plural the parts of the collection above",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is named the plural a page type gathers its pages under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named no page type's plural is refused before anything else is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page here is of that page type or of a page type extending it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page here names the page above as the collection holding that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page above is named by its page type and slug together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder above holding no page of its own is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The page above answering with two addresses is held by the one the pages here name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page here carries what that page holds in a file beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that is neither a page nor a file beside one is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder gathering no page at all is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A folder sitting inside is judged where that folder is.",
    },
  ],
} as const satisfies FolderShape
