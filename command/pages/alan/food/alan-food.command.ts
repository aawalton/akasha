import type { Command } from "akasha/command/command.page-type.types.ts"

export const alanFood = {
  id: "01a06809-250b-7ec1-99ac-2150ec2c5f74",
  type: "page-type/command",
  slug: "alan-food",
  definition: "the command filing one food Alan ate onto the day that food counts to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The food's name is the first word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call names one food.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A step after the entry never turns a written entry into a failed run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run says which steps after the entry did not land.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that refuses having written no entry says the fault alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run that refuses having written the entry names that entry and each write past it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which day an entry counts to is worked out from when the entry happened against when Alan woke.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wall clock said here is read in Mountain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wall time no Mountain instant reads as is refused rather than settled on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A date said with no time is read as noon.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A time said with no date is read on today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry is filed under the day and the food's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry is numbered where that name is taken on that day.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The hundred characters a page's slug holds bound the whole slug rather than the stem inside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The page type opening the slug and the number ending it are both counted against that length.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether an object store is there is settled before anything is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A photo the entry could not have leaves that photo where that photo is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here mends an entry already written.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a photo from anywhere but this machine.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The photo a call names is published as the entry's cover.",
    },
  ],
  name: "food",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/title", required: true, saidAs: "flag-or-word" },
    { argument: "argument/image" },
    { argument: "argument/plant-grams" },
    { argument: "argument/estimated-calories" },
    { argument: "argument/date" },
    { argument: "argument/time" },
  ],
} as const satisfies Command
