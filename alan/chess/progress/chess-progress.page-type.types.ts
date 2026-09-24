import type { ActiveDrill } from "akasha/alan/chess/progress/properties/active-drill.boolean-property.types.ts"
import type { ChessProgressStatus } from "akasha/alan/chess/progress/properties/chess-progress-status.select-property.types.ts"
import type { LastReviewed } from "akasha/alan/chess/progress/properties/last-reviewed.calendar-date-property.types.ts"
import type { MasteryLevel } from "akasha/alan/chess/progress/properties/mastery-level.select-property.types.ts"
import type { MotifId } from "akasha/alan/chess/progress/properties/motif-id.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"

export type ChessProgress = Page & {
  title: Title
  category: Category
  status: ChessProgressStatus
  description: Description
  motifId?: MotifId
  masteryLevel?: MasteryLevel
  lastReviewed?: LastReviewed
  activeDrill?: ActiveDrill
}
