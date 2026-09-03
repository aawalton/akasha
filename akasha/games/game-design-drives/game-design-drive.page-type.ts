import type { Domain } from "../../domain-system/domains/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-types/page-type.page-type.ts"

export type GameDesignDrive = Domain

export const gameDesignDrive = {
  id: "01a06746-de46-7a10-980b-3134872d9f6b",
  pageTypeSlug: "page-type",
  slug: "game-design-drive",
  definition: "what makes a person want to act",
  pluralSlug: "game-design-drives",
  extendsSlug: "page-type/domain",
} as const satisfies PageType
