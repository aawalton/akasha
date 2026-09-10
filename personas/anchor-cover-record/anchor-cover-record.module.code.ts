import type { PageCondition } from "@akasha/pages/core/page-types"
import { pad2 } from "../image-name/image-name.module.code.ts"
import {
  personaCondition,
  relationshipLevelMatchCondition,
} from "../page-conditions/persona-page-conditions.module.code.ts"

export const PERSONA_ANCHOR_IMAGE_PAGE_TYPE_SLUG = "persona-anchor-image"

export const PERSONA_COVER_IMAGE_PAGE_TYPE_SLUG = "persona-cover-image"

export interface AnchorImageRecordInput {
  readonly personaSlug: string
  readonly personaTitle: string
  readonly imagePath: string
  readonly imageRoot?: string
}

export interface AnchorImageSet {
  readonly title: string
  readonly persona: string
  readonly imagePath: string
  readonly imageRoot?: string
}

export interface AnchorImageRecord {
  readonly where: readonly PageCondition[]
  readonly set: AnchorImageSet
}

export function buildAnchorImageRecord(input: AnchorImageRecordInput): AnchorImageRecord {
  const rootField = input.imageRoot === undefined ? {} : { imageRoot: input.imageRoot }
  return {
    where: [personaCondition(input.personaSlug)],
    set: {
      title: `${input.personaTitle} — anchor`,
      persona: input.personaSlug,
      imagePath: input.imagePath,
      ...rootField,
    },
  }
}

export interface CoverImageRecordInput {
  readonly personaSlug: string
  readonly personaTitle: string
  readonly level: number
  readonly imagePath?: string
  readonly imageRoot?: string
}

export interface CoverImageSet {
  readonly title: string
  readonly persona: string
  readonly relationshipLevel: number
  readonly imagePath?: string
  readonly imageRoot?: string
}

export interface CoverImageRecord {
  readonly where: readonly PageCondition[]
  readonly set: CoverImageSet
}

export function buildCoverImageRecord(input: CoverImageRecordInput): CoverImageRecord {
  const pathField = input.imagePath === undefined ? {} : { imagePath: input.imagePath }
  const rootField = input.imageRoot === undefined ? {} : { imageRoot: input.imageRoot }
  return {
    where: [personaCondition(input.personaSlug), relationshipLevelMatchCondition(input.level)],
    set: {
      title: `${input.personaTitle} — cover L${pad2(input.level)}`,
      persona: input.personaSlug,
      relationshipLevel: input.level,
      ...pathField,
      ...rootField,
    },
  }
}
