import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"
import type { WorldMechanic } from "../world-mechanic.page-type.types.ts"

export type WorldClass = WorldMechanic

export const worldClass = {
  id: "01a06558-a991-7fd2-bd7e-0b9a3c64d355",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-class",
  definition: "what a character is, that they get better at by being it",
  pluralSlug: "world-classes",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
