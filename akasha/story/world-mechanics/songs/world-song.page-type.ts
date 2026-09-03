import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldSong = WorldMechanic

export const worldSong = {
  id: "01a06558-a991-7a9a-ae0f-69b9a7858eb3",
  pageTypeSlug: "page-type",
  slug: "world-song",
  definition: "an ability a character works by singing",
  pluralSlug: "world-songs",
  extendsSlug: "page-type/world-mechanic",
  runsTabooCheck: false,
} as const satisfies PageType
