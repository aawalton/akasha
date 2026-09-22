import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const rootRoute = {
  id: "01a063f3-c2ad-7357-b6ab-267960198089",
  type: "page-type/code-file-property",
  slug: "root-route",
  propertySlug: "root-route",
  definition: "the parent route of every other route",
  extensions: ["tsx"],
  fileName: "root.tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether the root route shows a stack is read from `import.meta.env`, not from `process.env`.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
