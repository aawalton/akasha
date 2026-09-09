import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Placements } from "./properties/placements.record-property.ts"
import type { SecretValue } from "./properties/secret-value.text-property.ts"

export type Secret = Page & {
  placements: Placements
  value?: SecretValue
}

export const secret = {
  id: "01a0684a-7d55-7000-bf3d-deee6d805174",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "secret",
  definition: "one secret value under a name of its own",
  pluralSlug: "secrets",
  extends: ["page-type/page"],
  parts: [
    "module/secret-placing",
    "module/secret-saying",
    "record-property/placements",
    "text-property/resource-key",
    "text-property/secret-value",
  ],
  properties: [
    { pageProperty: "record-property/placements", required: true, many: true, maxCount: null },
    { pageProperty: "text-property/secret-value", required: false, many: false, secret: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value sits in the sops file beside the page and never in the page.",
    },
    {
      invariantKind: "departure",
      statement: "One page has one value.",
    },
    {
      invariantKind: "departure",
      statement: "A resource of many keys is that many pages.",
    },
    {
      invariantKind: "departure",
      statement: "A value wanted in a second resource is a second placement rather than a copy.",
    },
    {
      invariantKind: "departure",
      statement: "The cluster is asked for the resource name and the key.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages putting a value in one resource under one key are refused.",
    },
    {
      invariantKind: "gap",
      statement: "Something inside akasha places these secrets on the cluster.",
    },
  ],
} as const satisfies PageType
