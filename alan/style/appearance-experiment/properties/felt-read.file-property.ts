import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const feltRead = {
  id: "01a0685d-b81f-75fb-859d-dbff41d461c4",
  type: "page-type/file-property",
  slug: "felt-read",
  propertySlug: "felt-read",
  definition: "how the thing Alan wears feels to Alan",
  extensions: ["txt"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A felt read is Alan's own rather than the persona's reading of Alan.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:42:47.583Z",
  updatedAt: "2026-10-30T16:31:14.756Z",
} as const satisfies FileProperty
