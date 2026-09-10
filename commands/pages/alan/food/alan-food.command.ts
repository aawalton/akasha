import type { Command } from "../../../command.page-type.types.ts"

export const alanFood = {
  id: "01a06809-250b-7ec1-99ac-2150ec2c5f74",
  pageTypeSlug: "command",
  type: "command",
  slug: "alan-food",
  definition: "the command acting on what Alan ate",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "log", takes: "the act, which is to write one food entry" },
    { said: "<title>", takes: "the food's short name, said here or with `--title`" },
    { said: "--title <name>", takes: "the food's short name, in place of the word after the act" },
    { said: "--image <path>", takes: "a photo on this machine, published as the entry's cover" },
    { said: "--plant-grams <n>", takes: "grams of whole plants in the food" },
    { said: "--estimated-calories <n>", takes: "the food's estimated total calories" },
    { said: "--date <YYYY-MM-DD>", takes: "the Mountain calendar date the food was eaten on" },
    { said: "--time <HH:MM>", takes: "the Mountain wall clock it was eaten at, read on that date" },
    { said: "--json", takes: "the entry as one JSON object rather than as a row for each field" },
  ],
  helpNotes: [
    "the act is first and one call names one food.",
    "plant grams are the one source of the nutrition points health pillar, at a point a gram, rolled up for the day after each entry.",
    "the entry records the instant it happened at, and which day it counts to is worked out from that instant against when Alan woke.",
    "a date said without a time is read as noon, and a time said without a date is read on today.",
    "every time said here is a US Mountain wall time, as akasha track reads one.",
    "a wall time the Mountain clock skipped or struck twice is refused rather than settled on.",
    "an entry with no photo is a weigh-and-enter row rather than a lesser entry.",
    "publishing the cover and re-rolling the day both happen after the entry, and either one missing leaves the run as it is.",
    "a step that did not land is named, because running the act again would write a second entry rather than mend the first.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word and the food's name is the second.",
    },
    {
      invariantKind: "departure",
      statement: "A step after the entry never turns a written entry into a failed run.",
    },
    {
      invariantKind: "departure",
      statement: "A run says which steps after the entry did not land.",
    },
    {
      invariantKind: "departure",
      statement: "A run that refuses wrote no entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which day an entry counts to is worked out from when the entry happened against when Alan woke.",
    },
    {
      invariantKind: "departure",
      statement: "A wall clock said here is read in Mountain.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time no Mountain instant reads as is refused rather than settled on.",
    },
    {
      invariantKind: "departure",
      statement: "A date said with no time is read as noon.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is filed under the day and the food's name.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is numbered where that name is taken on that day.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The hundred characters a page's slug holds bound the whole slug rather than the stem inside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page type opening the slug and the number ending it are both counted against that length.",
    },
    {
      invariantKind: "departure",
      statement: "Whether an object store is there is settled before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "A photo the entry could not have leaves that photo where that photo is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mends an entry already written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a photo from anywhere but this machine.",
    },
  ],
} as const satisfies Command
