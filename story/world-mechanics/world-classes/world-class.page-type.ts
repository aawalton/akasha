import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldClass = WorldMechanic

export const worldClass = {
  id: "01a06558-a991-7fd2-bd7e-0b9a3c64d355",
  pageTypeSlug: "page-type",
  slug: "world-class",
  definition: "what a character is, that they get better at by being it",
  pluralSlug: "world-classes",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
