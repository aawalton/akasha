import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ManifestCode } from "./properties/manifest-code.file-property.ts"

export type Manifest = Domain & {
  code: ManifestCode
}

export const manifest = {
  id: "01a06da1-b337-78b9-8ad3-556e6b67058e",
  pageTypeSlug: "page-type",
  slug: "manifest",
  definition: "the Kubernetes resources a thing is applied as",
  pluralSlug: "manifests",
  partSlugs: ["file-property/manifest-code"],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "manifest-code", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A manifest is found by its page type rather than by its file name.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest's resources are applied to the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is generated into YAML before it is applied.",
    },
  ],
} as const satisfies PageType
