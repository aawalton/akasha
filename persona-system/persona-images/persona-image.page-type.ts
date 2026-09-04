import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { PersonaSlug } from "../../domain-system/initiatives/properties/persona-slug.relation-property.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { ImagePath } from "./properties/image-path.text-property.ts"
import type { ImageRoot } from "./properties/image-root.text-property.ts"

export type PersonaImage = Page & {
  title: Title
  personaSlug: PersonaSlug
  imagePath?: ImagePath
  imageRoot?: ImageRoot
}

export const personaImage = {
  id: "01a0655b-4a9b-7009-9c47-3a4467acc46f",
  pageTypeSlug: "page-type",
  slug: "persona-image",
  definition: "a picture a persona is drawn as",
  pluralSlug: "persona-images",
  extendsSlug: "page-type/page",
  partSlugs: [
    "relation-property/persona-slug",
    "text-property/image-path",
    "text-property/image-root",
    "text-property/title",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "persona-slug", required: true, many: false },
    { pagePropertySlug: "image-path", required: false, many: false },
    { pagePropertySlug: "image-root", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A picture is one persona's.",
    },
    {
      invariantKind: "departure",
      statement: "The picture itself stands outside this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A record naming no path is one whose picture is kept under its own identity.",
    },
    {
      invariantKind: "absence",
      statement: "No page of this type stands on its own.",
    },
  ],
} as const satisfies PageType
