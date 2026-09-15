import type { EndDate } from "akasha/alan/self/life-theme/properties/end-date.calendar-date-property.types.ts"
import type { LifeThemeParent } from "akasha/alan/self/life-theme/properties/life-theme-parent.relation-property.types.ts"
import type { LifeThemeStatus } from "akasha/alan/self/life-theme/properties/life-theme-status.select-property.types.ts"
import type { LifeThemeValue } from "akasha/alan/self/life-theme/properties/life-theme-value.relation-property.types.ts"
import type { StartDate } from "akasha/alan/self/life-theme/properties/start-date.calendar-date-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type LifeTheme = Page & {
  title: Title
  endDate?: EndDate
  lifeThemeParent?: LifeThemeParent
  startDate?: StartDate
  lifeThemeStatus: LifeThemeStatus
  lifeThemeValue: LifeThemeValue
}
