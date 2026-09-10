import type { Page } from "../../../pages/page.page-type.types.ts"
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
