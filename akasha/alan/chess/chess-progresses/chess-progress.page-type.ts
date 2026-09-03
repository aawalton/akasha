import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Category } from "../../../temper/temper-things/properties/category.text-property.ts"
import type { Description } from "../../../temper/temper-things/properties/description.text-property.ts"
import type { Icon } from "../../../temper/temper-things/properties/icon.text-property.ts"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { ActiveDrill } from "./properties/active-drill.boolean-property.ts"
import type { ChessProgressStatus } from "./properties/chess-progress-status.select-property.ts"
import type { LastReviewed } from "./properties/last-reviewed.calendar-date-property.ts"
import type { MasteryLevel } from "./properties/mastery-level.select-property.ts"
import type { MotifId } from "./properties/motif-id.text-property.ts"

export type ChessProgress = Page & {
  title: Title
  category: Category
  status: ChessProgressStatus
  description: Description
  motifId?: MotifId
  masteryLevel?: MasteryLevel
  lastReviewed?: LastReviewed
  activeDrill?: ActiveDrill
  icon?: Icon
}

export const chessProgress = {
  id: "01a06582-bd62-702f-92a4-3fd313251ee2",
  pageTypeSlug: "page-type",
  slug: "chess-progress",
  definition: "how far one part of Alan's chess has come",
  pluralSlug: "chess-progresses",
  extendsSlug: "page-type/page",
  runsTabooCheck: false,
  partSlugs: [
    "boolean-property/active-drill",
    "calendar-date-property/last-reviewed",
    "select-property/chess-progress-status",
    "select-property/mastery-level",
    "text-property/motif-id",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "category", required: true, many: false },
    { pagePropertySlug: "chess-progress-status", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "motif-id", required: false, many: false },
    { pagePropertySlug: "mastery-level", required: false, many: false },
    { pagePropertySlug: "last-reviewed", required: false, many: false },
    { pagePropertySlug: "active-drill", required: false, many: false },
    { pagePropertySlug: "icon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What was written about a part of Alan's chess is its description.",
    },
    {
      invariantKind: "departure",
      statement: "A page of category `motif` names the motif it is about.",
    },
    {
      invariantKind: "departure",
      statement: "A motif is named by the Lichess theme the puzzle rows carry.",
    },
    {
      invariantKind: "departure",
      statement: "The prose here is Alan's coach writing about Alan rather than akasha's own.",
    },
  ],
} as const satisfies PageType
