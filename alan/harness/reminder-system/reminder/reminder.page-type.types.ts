import type { NextAt } from "akasha/alan/harness/reminder-system/reminder/properties/next-at.instant-property.types.ts"
import type { ReminderSchedule } from "akasha/alan/harness/reminder-system/reminder/properties/reminder-schedule.text-property.types.ts"
import type { ReminderText } from "akasha/alan/harness/reminder-system/reminder/properties/reminder-text.text-property.types.ts"
import type { SentFrom } from "akasha/alan/harness/reminder-system/reminder/properties/sent-from.relation-property.types.ts"
import type { SentTo } from "akasha/alan/harness/reminder-system/reminder/properties/sent-to.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Reminder = Page & {
  to: SentTo
  from: SentFrom
  schedule: ReminderSchedule
  text: ReminderText
  nextAt?: NextAt
}
