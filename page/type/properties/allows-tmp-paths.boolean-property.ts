import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const allowsTmpPaths = {
  id: "01a0722b-2eaf-7edc-9104-bd5677e7020d",
  type: "page-type/boolean-property",
  slug: "allows-tmp-paths",
  propertySlug: "allows-tmp-paths",
  definition:
    "whether the paths a page of this type spells are a container's rather than this machine's",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type saying nothing here spells the paths of this workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type says true here where its pages spell the paths inside a container.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path inside a container is not a path on this workstation.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T15:23:47.759Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies BooleanProperty
