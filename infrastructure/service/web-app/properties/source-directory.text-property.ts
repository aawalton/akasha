import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sourceDirectory = {
  id: "01a05b26-f8b6-7d79-b5c7-6e8267081489",
  type: "text-property",
  slug: "source-directory",
  propertySlug: "source-directory",
  definition: "the folder a web app's source sits in",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is named from the repository root.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No slash opens or closes the folder named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A web app's build is made in this folder.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
