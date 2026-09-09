import type { FileProperty } from "../file-properties/file-property.page-type.ts"
import type { FileName } from "../file-properties/properties/file-name.text-property.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type NamedFileProperty = FileProperty & {
  fileName: FileName
}

export const namedFileProperty = {
  id: "01a0585d-233c-7751-bd99-e0a0926439b2",
  pageTypeSlug: "page-type",
  slug: "named-file-property",
  definition: "a page property held in a file whose name is stated",
  pluralSlug: "named-file-properties",
  extendsSlug: ["page-type/file-property"],
  properties: [{ pagePropertySlug: "text-property/file-name", required: true, many: false }],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A name here is chosen outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "The page states the name its file is under.",
    },
    {
      invariantKind: "departure",
      statement: "A page claims a named file by stating the property with that file.",
    },
    {
      invariantKind: "departure",
      statement: "A named file is found through the page's type rather than through its name.",
    },
    {
      invariantKind: "gap",
      statement: "A name the naming grammar could build is refused.",
    },
  ],
} as const satisfies PageType
