import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export type RootRoute = "tsx"

export const rootRoute = {
  id: "01a063f3-c2ad-7357-b6ab-267960198089",
  pageTypeSlug: "code-file-property",
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
} as const satisfies CodeFileProperty
