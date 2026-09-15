import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const testFixturesOnly = {
  id: "01a09c39-04e2-79c7-be33-a7bdb265f7f1",
  type: "folder-shape",
  slug: "test-fixtures-only",
  definition: "the shape of a folder with the test fixture folders the page above it declares",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is named `test-fixtures`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page claims that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each test fixture has a folder to itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with any file of its own is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every subfolder has a test fixture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every test fixture in that folder is a part the page above declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder above holding no page is asked for no part.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The files a test fixture holds are judged where that test fixture is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder holding a second page is the folder of no test fixture.",
    },
  ],
} as const satisfies FolderShape
