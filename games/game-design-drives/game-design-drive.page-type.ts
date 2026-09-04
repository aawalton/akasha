import type { Domain } from "../../domain-system/domains/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-types/page-type.page-type.ts"
import type { Octalysis } from "./properties/octalysis.record-property.ts"

export type GameDesignDrive = Domain & {
  octalysis: Octalysis
}

export const gameDesignDrive = {
  id: "01a06746-de46-7a10-980b-3134872d9f6b",
  pageTypeSlug: "page-type",
  slug: "game-design-drive",
  definition: "what makes a person want to act",
  pluralSlug: "game-design-drives",
  extendsSlug: "page-type/domain",
  partSlugs: [
    "game-design-drive/game-design-drive-collection",
    "game-design-drive/game-design-drive-connection",
    "game-design-drive/game-design-drive-creativity",
    "game-design-drive/game-design-drive-loss",
    "game-design-drive/game-design-drive-meaning",
    "game-design-drive/game-design-drive-novelty",
    "game-design-drive/game-design-drive-progress",
    "game-design-drive/game-design-drive-scarcity",
    "number-property/octalysis-number",
    "record-property/octalysis",
    "text-property/octalysis-definition",
    "text-property/octalysis-name",
  ],
  properties: [{ pagePropertySlug: "octalysis", required: true, many: false }],
} as const satisfies PageType
