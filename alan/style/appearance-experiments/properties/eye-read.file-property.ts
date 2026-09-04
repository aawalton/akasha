import type { FileProperty } from "@akasha/pages-system/file-property"

export type EyeRead = "txt"

export const eyeRead = {
  id: "01a0685d-b81f-7e55-a063-f0493086a225",
  pageTypeSlug: "file-property",
  slug: "eye-read",
  propertySlug: "eye-read",
  definition: "how the try read to the persona watching it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An eye read is the persona's reading rather than Alan's.",
    },
  ],
} as const satisfies FileProperty
