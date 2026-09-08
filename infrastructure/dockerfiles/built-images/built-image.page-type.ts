import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { ImageExtensions } from "./properties/image-extensions.file-property.ts"
import type { ImageFolder } from "./properties/image-folder.text-property.ts"
import type { ImageKind } from "./properties/image-kind.text-property.ts"

export type BuiltImage = Domain & {
  kind: ImageKind
  folder: ImageFolder
  extensions?: ImageExtensions
}

export const builtImage = {
  id: "01a08193-c20c-7525-aced-8d801a2e9cd6",
  pageTypeSlug: "page-type",
  slug: "built-image",
  definition: "a container image a Dockerfile is written for",
  pluralSlug: "built-images",
  partSlugs: [
    "built-image/alanwalton-calendar-sync",
    "built-image/auth-proxy",
    "built-image/gfs-promoter",
    "file-property/image-extensions",
    "text-property/image-folder",
    "text-property/image-kind",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "text-property/image-kind", required: true, many: false },
    { pagePropertySlug: "text-property/image-folder", required: true, many: false },
    { pagePropertySlug: "file-property/image-extensions", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An image's Dockerfile is written from what the image states rather than kept.",
    },
    {
      invariantKind: "departure",
      statement: "An image states the sort of Dockerfile written for it.",
    },
    {
      invariantKind: "departure",
      statement: "An image adding to its Dockerfile holds what it adds beside its own page.",
    },
    {
      invariantKind: "departure",
      statement: "An image adding nothing states no extensions.",
    },
  ],
} as const satisfies PageType
