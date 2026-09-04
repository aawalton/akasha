import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ResourceName } from "../cluster-services/properties/resource-name.text-property.ts"
import type { ResourceKey } from "./properties/resource-key.text-property.ts"
import type { SecretValue } from "./properties/secret-value.text-property.ts"

export type Secret = Page & {
  resourceName: ResourceName
  resourceKey: ResourceKey
  value?: SecretValue
}

export const secret = {
  id: "01a0684a-7d55-7000-bf3d-deee6d805174",
  pageTypeSlug: "page-type",
  slug: "secret",
  definition: "one secret value under a name of its own",
  pluralSlug: "secrets",
  extendsSlug: "page-type/page",
  partSlugs: ["text-property/resource-key", "text-property/secret-value"],
  properties: [
    { pagePropertySlug: "resource-name", required: true, many: false },
    { pagePropertySlug: "resource-key", required: true, many: false },
    { pagePropertySlug: "secret-value", required: false, many: false, secret: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value stands in the sops file beside the page and never in the page.",
    },
    {
      invariantKind: "departure",
      statement: "One page holds one value.",
    },
    {
      invariantKind: "departure",
      statement: "A resource of many keys is that many pages.",
    },
    {
      invariantKind: "departure",
      statement: "The resource name and the key are what the cluster is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "Two pages claiming one resource name and key are refused.",
    },
    {
      invariantKind: "gap",
      statement: "Something inside akasha places these secrets on the cluster.",
    },
  ],
} as const satisfies PageType
