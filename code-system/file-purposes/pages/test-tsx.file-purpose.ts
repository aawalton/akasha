import type { FilePurpose } from "../file-purpose.page-type.ts"

export const testTsx = {
  id: "01a06860-a0ef-7699-bc5d-c45850b551d2",
  pageTypeSlug: "file-purpose",
  slug: "test-tsx",
  definition: "a file of TypeScript source with markup, holding tests",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file whose name ends `test.tsx` is of this purpose.",
    },
    {
      invariantKind: "departure",
      statement: "A test written with markup is of this purpose rather than of `test-ts`.",
    },
  ],
} as const satisfies FilePurpose
