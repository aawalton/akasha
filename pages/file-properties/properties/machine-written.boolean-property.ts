import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type MachineWritten = boolean

export const machineWritten = {
  id: "01a06d4d-c32a-73c2-8814-5b8f1754297f",
  pageTypeSlug: "boolean-property",
  slug: "machine-written",
  propertySlug: "machine-written",
  definition: "whether a machine rather than an author writes the files a property holds",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property saying nothing here holds what an author writes.",
    },
    {
      invariantKind: "departure",
      statement: "No author writes such a file by hand.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the machine that writes the file.",
    },
  ],
} as const satisfies BooleanProperty
