import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Presence = "log"

export const presence = {
  id: "01a08c6e-5033-76ee-a20a-1749dede688b",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "presence",
  propertySlug: "presence",
  definition: "what a supervisor saw of the subagents its agent held",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent taken down is said here rather than left to a count.",
    },
    {
      invariantKind: "departure",
      statement: "This record is kept outside the commit.",
    },
  ],
} as const satisfies FileProperty
