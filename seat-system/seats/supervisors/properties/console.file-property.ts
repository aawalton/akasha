import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Console = "log"

export const console = {
  id: "01a08c6d-b3d9-7a5c-b841-71cda78dc49a",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "console",
  propertySlug: "console",
  definition: "what a supervisor wrote to its own console while it ran",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "This console is kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "No page states its own console.",
    },
  ],
} as const satisfies FileProperty
