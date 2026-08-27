import type { PageCondition } from "@shared/pages-core/page-types"
import { personaSlugCondition, relationshipLevelMatchCondition } from "./persona-page-conditions"

export const PERSONA_WALLPAPER_PAGE_TYPE_SLUG = "persona-wallpaper"

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

export interface WallpaperImageRecordInput {
  readonly personaSlug: string
  readonly personaTitle: string
  readonly level: number
  readonly stage: string
  readonly esoDay: string
  readonly imagePath: string
  readonly imageRoot?: string
}

export interface WallpaperImageSet {
  readonly title: string
  readonly personaSlug: string
  readonly relationshipLevel: number
  readonly stage: string
  readonly esoDay: string
  readonly imagePath: string
  readonly imageRoot?: string
}

export interface WallpaperImageRecord {
  readonly where: readonly PageCondition[]
  readonly set: WallpaperImageSet
}

export function buildWallpaperImageRecord(input: WallpaperImageRecordInput): WallpaperImageRecord {
  return {
    where: [personaSlugCondition(input.personaSlug), relationshipLevelMatchCondition(input.level)],
    set: {
      title: `${input.personaTitle} — wallpaper L${pad2(input.level)} (${input.stage})`,
      personaSlug: input.personaSlug,
      relationshipLevel: input.level,
      stage: input.stage,
      esoDay: input.esoDay,
      imagePath: input.imagePath,
      ...(input.imageRoot === undefined ? {} : { imageRoot: input.imageRoot }),
    },
  }
}
