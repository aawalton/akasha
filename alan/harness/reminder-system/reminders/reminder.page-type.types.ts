import type { Page } from "../../../../pages/page.page-type.types.ts"
import type { NextAt } from "./properties/next-at.instant-property.ts"
import type { ReminderSchedule } from "./properties/reminder-schedule.text-property.ts"
import type { ReminderText } from "./properties/reminder-text.text-property.ts"
import type { SentFrom } from "./properties/sent-from.relation-property.ts"
import type { SentTo } from "./properties/sent-to.relation-property.ts"

export type Reminder = Page & {
  to: SentTo
  from: SentFrom
  schedule: ReminderSchedule
  text: ReminderText
  nextAt?: NextAt
}
