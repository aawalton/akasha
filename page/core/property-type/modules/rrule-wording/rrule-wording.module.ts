import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rruleWording = {
  id: "01a0c4f9-83fa-7dde-aee6-9ce457c3ea99",
  type: "page-type/module",
  slug: "rrule-wording",
  definition: "what a recurrence rule is worded as where a page shows one",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule reads as words rather than as the iCalendar text the property holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wording is this repository's own rather than the one the library says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An interval of two reads as `other` rather than as the number two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A monthly interval of three reads as `Quarterly`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weekly rule naming one day reads as that day's whole name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A weekly rule naming several days reads as those days shortened to three letters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those days are said in week order from Monday whatever order the rule names them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The five working days read as `Weekdays`, and Saturday with Sunday as `Weekends`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weekly rule naming all seven days reads as `Daily`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A weekly rule over an interval names its days rather than the set those days are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A monthly rule naming a day of the month says that day as an ordinal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A monthly rule counting one day back from the end reads as the month's last day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A monthly rule naming a numbered weekday says that number as a word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number the rule carries on its position is read where the weekday carries none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A yearly rule naming a month and a day says the day before the month.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of one reads as `once` rather than as one time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bound on a date is said the way this repository says any calendar date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bound falling in the year the reading is made in drops the year.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The year the reading is made in is read off an instant handed in where one is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An anchor from completion is said after the wording and before the bound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule that will not parse reads as the text it was rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule holding a part this wording does not cover reads as the text it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule bound by both a count and a date is a part this wording does not cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weekday counted from the end of the month other than the last is not covered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock but a bound on a date handed no instant to read by.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every rule a recurrence property can hold reads as words.",
    },
  ],
} as const satisfies Module
