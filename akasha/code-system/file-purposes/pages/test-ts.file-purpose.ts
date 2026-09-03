import type { FilePurpose } from "../file-purpose.page-type.ts"

export const testTs = {
  id: "01a06860-a0ef-77a2-b7d4-1fd2a8169652",
  pageTypeSlug: "file-purpose",
  slug: "test-ts",
  definition: "a file of TypeScript source holding tests",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file whose name ends `test.ts` is of this purpose.",
    },
    {
      invariantKind: "gap",
      statement: "The ending stands here as prose until a purpose can state one as a property.",
    },
  ],
} as const satisfies FilePurpose
