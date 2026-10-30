import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const eyeRead = {
  id: "01a0685d-b81f-7e55-a063-f0493086a225",
  type: "page-type/file-property",
  slug: "eye-read",
  propertySlug: "eye-read",
  definition: "how the thing Alan wears looks to the persona",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An eye read is the persona's reading rather than Alan's.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:42:47.583Z",
  updatedAt: "2026-10-30T16:31:00.037Z",
} as const satisfies FileProperty
