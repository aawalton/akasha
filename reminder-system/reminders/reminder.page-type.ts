import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
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

export const reminder = {
  id: "01a05f42-d941-7001-9948-d1816099c8ac",
  pageTypeSlug: "page-type",
  slug: "reminder",
  definition: "words sent to somebody at the times the words name",
  pluralSlug: "reminders",
  extendsSlug: ["page-type/page"],
  mortal: true,
  partSlugs: [
    "instant-property/next-at",
    "relation-property/sent-from",
    "relation-property/sent-to",
    "text-property/reminder-schedule",
    "text-property/reminder-text",
  ],
  properties: [
    { pagePropertySlug: "sent-to", required: true, many: false },
    { pagePropertySlug: "sent-from", required: true, many: false },
    { pagePropertySlug: "reminder-schedule", required: true, many: false },
    { pagePropertySlug: "reminder-text", required: true, many: false },
    { pagePropertySlug: "next-at", required: false, many: false, uncommitted: true },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reminder names the times for sending as systemd states a calendar.",
    },
    {
      invariantKind: "departure",
      statement: "Systemd is asked when the next sending falls rather than a parser here.",
    },
    {
      invariantKind: "departure",
      statement: "A reminder first seen is armed rather than sent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reminder whose sending was missed while nothing ran is caught up rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A reminder naming one time is taken away once that reminder has sent.",
    },
    {
      invariantKind: "departure",
      statement: "When a reminder next falls due is held outside the commit.",
    },
    {
      invariantKind: "absence",
      statement: "A reminder says nothing about how the words reach the persona named.",
    },
  ],
} as const satisfies PageType
