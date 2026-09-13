import type { FolderShape } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.types.ts"

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
      invariantKind: "departure",
      statement: "The folder is named `test-fixtures`.",
    },
    {
      invariantKind: "departure",
      statement: "No page claims that name.",
    },
    {
      invariantKind: "departure",
      statement: "Each test fixture has a folder to itself.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with any file of its own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every subfolder has a test fixture.",
    },
    {
      invariantKind: "departure",
      statement: "Every test fixture in that folder is a part the page above declares.",
    },
    {
      invariantKind: "departure",
      statement: "A folder above holding no page is asked for no part.",
    },
    {
      invariantKind: "absence",
      statement: "The files a test fixture holds are judged where that test fixture is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding a second page is the folder of no test fixture.",
    },
  ],
} as const satisfies FolderShape
