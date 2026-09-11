import type { EndDate } from "akasha/alan/self/life-themes/properties/end-date.calendar-date-property.types.ts"
import type { LifeThemeParent } from "akasha/alan/self/life-themes/properties/life-theme-parent.relation-property.types.ts"
import type { LifeThemeStatus } from "akasha/alan/self/life-themes/properties/life-theme-status.select-property.types.ts"
import type { LifeThemeValue } from "akasha/alan/self/life-themes/properties/life-theme-value.relation-property.types.ts"
import type { StartDate } from "akasha/alan/self/life-themes/properties/start-date.calendar-date-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type LifeTheme = Page & {
  title: Title
  endDate?: EndDate
  lifeThemeParent?: LifeThemeParent
  startDate?: StartDate
  lifeThemeStatus: LifeThemeStatus
  lifeThemeValue: LifeThemeValue
}
