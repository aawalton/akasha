import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const rootRoute = {
  id: "01a063f3-c2ad-7357-b6ab-267960198089",
  type: "code-file-property",
  slug: "root-route",
  propertySlug: "root-route",
  definition: "the route every other route renders inside",
  extensions: ["tsx"],
  fileName: "root.tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Whether the root route shows a stack is read from `import.meta.env`, not from `process.env`.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
