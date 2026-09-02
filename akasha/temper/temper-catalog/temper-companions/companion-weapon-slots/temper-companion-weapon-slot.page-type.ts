import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionWeaponSlot = TemperCompanionThing

export const temperCompanionWeaponSlot = {
  id: "01a05fcd-41a9-7114-8636-28bd59dc4a76",
  pageTypeSlug: "page-type",
  slug: "temper-companion-weapon-slot",
  definition: "a hand a companion holds one weapon in",
  pluralSlug: "temper-companion-weapon-slots",
  extendsSlug: "page-type/temper-companion-thing",
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
