import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { EndDate } from "./properties/end-date.calendar-date-property.ts"
import type { LifeThemeParent } from "./properties/life-theme-parent.relation-property.ts"
import type { LifeThemeStatus } from "./properties/life-theme-status.select-property.ts"
import type { LifeThemeValue } from "./properties/life-theme-value.relation-property.ts"
import type { StartDate } from "./properties/start-date.calendar-date-property.ts"

export type LifeTheme = Page & {
  title: Title
  endDate?: EndDate
  lifeThemeParent?: LifeThemeParent
  startDate?: StartDate
  lifeThemeStatus: LifeThemeStatus
  lifeThemeValue: LifeThemeValue
}
