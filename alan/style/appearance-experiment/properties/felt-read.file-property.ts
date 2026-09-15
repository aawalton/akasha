import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const feltRead = {
  id: "01a0685d-b81f-75fb-859d-dbff41d461c4",
  type: "file-property",
  slug: "felt-read",
  propertySlug: "felt-read",
  definition: "how the try landed on Alan wearing it",
  extensions: ["txt"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A felt read is Alan's own rather than the persona's reading of Alan.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
