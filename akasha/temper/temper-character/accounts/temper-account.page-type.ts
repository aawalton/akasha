import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCharacterThing } from "../temper-character-things/temper-character-thing.page-type.ts"

export type TemperAccount = TemperCharacterThing

export const temperAccount = {
  id: "01a05fcd-f547-7f1d-8f1e-1feeb37eebb3",
  pageTypeSlug: "page-type",
  slug: "temper-account",
  definition: "one Elder Scrolls Online account temper keeps track of",
  pluralSlug: "temper-accounts",
  extendsSlug: "page-type/temper-character-thing",
} as const satisfies PageType
