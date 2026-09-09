import type { TextProperty } from "@akasha/pages/text-property"

export type LinkTarget = string

export const linkTarget = {
  id: "01a06823-89b2-700b-91db-fce33ac0739a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "link-target",
  propertySlug: "target",
  definition: "where a link goes: a web address, or a path inside the app",
  maxLength: 1000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target on the native platform is a path rather than a web address.",
    },
    {
      invariantKind: "gap",
      statement: "A target reached over the web is a url property rather than text.",
    },
  ],
} as const satisfies TextProperty
