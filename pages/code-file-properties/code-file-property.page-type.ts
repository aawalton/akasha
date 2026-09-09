import type { FileProperty } from "../file-properties/file-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type CodeFileProperty = FileProperty

export const codeFileProperty = {
  id: "01a0877d-0474-7e0b-9ce4-b84e15eed4ed",
  pageTypeSlug: "page-type",
  slug: "code-file-property",
  definition: "a page property held in a file something runs",
  pluralSlug: "code-file-properties",
  extends: ["page-type/file-property"],
} as const satisfies PageType
