import type { PageCondition } from "@akasha/pages-core/page-types"
import { pad2 } from "../image-name/image-name.module.code.ts"
import {
  personaSlugCondition,
  relationshipLevelMatchCondition,
} from "../persona-page-conditions/persona-page-conditions.module.code.ts"

export const PERSONA_WALLPAPER_PAGE_TYPE_SLUG = "persona-wallpaper"

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
