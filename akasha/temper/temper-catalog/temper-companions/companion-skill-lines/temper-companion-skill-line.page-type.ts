import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionSkillLine = TemperCompanionThing

export const temperCompanionSkillLine = {
  id: "01a05fce-1854-7d72-872a-0e22ce5c84c5",
  pageTypeSlug: "page-type",
  slug: "temper-companion-skill-line",
  definition: "a group of companion abilities learned together",
  pluralSlug: "temper-companion-skill-lines",
  extendsSlug: "page-type/temper-companion-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "companion-id", required: true, many: false },
    { pagePropertySlug: "category", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
