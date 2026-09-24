import type { FilePurpose } from "akasha/code/file-purpose/file-purpose.page-type.types.ts"

export const testTsx = {
  id: "01a06860-a0ef-7699-bc5d-c45850b551d2",
  type: "page-type/file-purpose",
  slug: "test-tsx",
  definition: "a file of TypeScript source with markup, with tests",
  namePatterns: ["*.test.tsx"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A test written with markup is of this purpose rather than of `test-ts`.",
    },
  ],
} as const satisfies FilePurpose
