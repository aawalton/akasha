import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"

export type EquipmentItem = Page & {
  title: Title
}

export const equipmentItem = {
  id: "01a06834-ca86-76cb-a54a-6f86a5225afc",
  pageTypeSlug: "page-type",
  slug: "equipment-item",
  definition: "a piece of kit Alan can load a movement with",
  pluralSlug: "equipment-items",
  extendsSlug: "page-type/page",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A piece of kit Alan owns is its own page, apart from the kit vocabulary a movement is tagged with.",
    },
  ],
} as const satisfies PageType
