import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type Secret = boolean

export const secret = {
  id: "01a0547c-6ae7-7000-897a-83b3e0d40bc4",
  pageTypeSlug: "boolean-property",
  slug: "secret",
  propertySlug: "secret",
  definition:
    "whether the value a page carries for this property is hidden from whoever holds the files",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Whoever can read the repository can read every other value in it from the files.",
    },
    {
      invariantKind: "departure",
      statement: "A secret value is put in through a command that encrypts it.",
    },
    {
      invariantKind: "absence",
      statement: "No write of the page's own file carries a secret value.",
    },
    {
      invariantKind: "departure",
      statement: "A secret value is withheld from a read that did not ask for it.",
    },
  ],
} as const satisfies BooleanProperty
