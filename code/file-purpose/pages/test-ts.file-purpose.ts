import type { FilePurpose } from "akasha/code/file-purpose/file-purpose.page-type.types.ts"

export const testTs = {
  id: "01a06860-a0ef-77a2-b7d4-1fd2a8169652",
  type: "page-type/file-purpose",
  slug: "test-ts",
  definition: "a file of TypeScript code that holds tests",
  namePatterns: ["*.test.ts"],
  createdAt: "2026-09-03T17:45:58.255Z",
  updatedAt: "2026-10-30T15:35:41.775Z",
} as const satisfies FilePurpose
