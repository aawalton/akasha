import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type AllowsTmpPaths = boolean

export const allowsTmpPaths = {
  id: "01a0722b-2eaf-7edc-9104-bd5677e7020d",
  pageTypeSlug: "boolean-property",
  slug: "allows-tmp-paths",
  propertySlug: "allows-tmp-paths",
  definition:
    "whether the paths a page of this type spells are a container's rather than this machine's",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type saying nothing here spells the paths of this workstation.",
    },
    {
      invariantKind: "departure",
      statement: "A page type says true here where its pages spell the paths inside a container.",
    },
    {
      invariantKind: "departure",
      statement: "A path inside a container is not a path on this workstation.",
    },
  ],
} as const satisfies BooleanProperty
