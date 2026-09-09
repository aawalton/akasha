import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"
import type { GeneratedDirectory } from "./properties/generated-directory.build-folder-property.ts"
import type { ManifestCode } from "./properties/manifest-code.code-file-property.ts"

export type Manifest = Domain & {
  code: ManifestCode
  generatedDirectory?: GeneratedDirectory
}

export const manifest = {
  id: "01a06da1-b337-78b9-8ad3-556e6b67058e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "manifest",
  definition: "the Kubernetes resources a thing is applied as",
  pluralSlug: "manifests",
  parts: ["code-file-property/manifest-code", "build-folder-property/generated-directory"],
  extends: ["page-type/domain"],
  allowsTmpPaths: true,
  properties: [
    { pageProperty: "code-file-property/manifest-code", required: true, many: false },
    { pageProperty: "build-folder-property/generated-directory", required: false, many: false },
  ],
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
      statement: "A manifest is generated into YAML before that manifest is applied.",
    },
    {
      invariantKind: "departure",
      statement: "A container told to run start runs in a package stating a start script.",
    },
  ],
} as const satisfies PageType
