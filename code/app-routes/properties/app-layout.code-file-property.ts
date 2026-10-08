import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const appLayout = {
  id: "01a07917-b971-76f3-8ada-fc17be46e258",
  type: "page-type/code-file-property",
  slug: "app-layout",
  propertySlug: "app-layout",
  definition: "the parent route of a signed-in reader's routes",
  extensions: ["tsx"],
  fileName: "_app-layout.tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route is reached by the route table rather than by a url.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A router app serving a signed-out reader alone states no app layout.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T23:39:53.073Z",
  updatedAt: "2026-09-22T14:31:17.000Z",
} as const satisfies CodeFileProperty
