import type { FilePurpose } from "akasha/code/file-purpose/file-purpose.page-type.types.ts"

export const testTs = {
  id: "01a06860-a0ef-77a2-b7d4-1fd2a8169652",
  type: "page-type/file-purpose",
  slug: "test-ts",
  definition: "a file of TypeScript source holding tests",
  namePatterns: ["*.test.ts"],
} as const satisfies FilePurpose
