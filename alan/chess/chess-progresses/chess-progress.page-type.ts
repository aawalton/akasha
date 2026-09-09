import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Description } from "../../../pages/properties/description.text-property.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Category } from "../../../temper/things/properties/category.text-property.ts"
import type { Icon } from "../../../temper/things/properties/icon.text-property.ts"
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
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "boolean-property/active-drill",
    "calendar-date-property/last-reviewed",
    "select-property/chess-progress-status",
    "select-property/mastery-level",
    "text-property/motif-id",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "text-property/category", required: true, many: false },
    { pagePropertySlug: "select-property/chess-progress-status", required: true, many: false },
    { pagePropertySlug: "text-property/description", required: true, many: false },
    { pagePropertySlug: "text-property/motif-id", required: false, many: false },
    { pagePropertySlug: "select-property/mastery-level", required: false, many: false },
    { pagePropertySlug: "calendar-date-property/last-reviewed", required: false, many: false },
    { pagePropertySlug: "boolean-property/active-drill", required: false, many: false },
    { pagePropertySlug: "text-property/icon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The prose written about a part of Alan's chess is its description.",
    },
    {
      invariantKind: "departure",
      statement: "A page of category `motif` names the motif that page is about.",
    },
    {
      invariantKind: "departure",
      statement: "A motif is named by the Lichess theme the puzzle rows have.",
    },
    {
      invariantKind: "departure",
      statement: "The prose here is Alan's coach writing about Alan rather than akasha's own.",
    },
  ],
} as const satisfies PageType
