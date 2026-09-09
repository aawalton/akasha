import type { PageType } from "@akasha/pages/page-type"

export const reminder = {
  id: "01a05f42-d941-7001-9948-d1816099c8ac",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "reminder",
  definition: "words sent to somebody at the times the words name",
  pluralSlug: "reminders",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "instant-property/next-at",
    "relation-property/sent-from",
    "relation-property/sent-to",
    "text-property/reminder-schedule",
    "text-property/reminder-text",
    "module/reminder-sending",
  ],
  properties: [
    { pageProperty: "relation-property/sent-to", required: true, many: false },
    { pageProperty: "relation-property/sent-from", required: true, many: false },
    { pageProperty: "text-property/reminder-schedule", required: true, many: false },
    { pageProperty: "text-property/reminder-text", required: true, many: false },
    {
      pageProperty: "instant-property/next-at",
      required: false,
      many: false,
      uncommitted: true,
    },
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
  types: "ts",
} as const satisfies PageType
