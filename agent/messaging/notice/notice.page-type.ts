import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const notice = {
  id: "019ffe7f-d49d-7000-ba76-13378b883aa0",
  type: "page-type/page-type",
  slug: "notice",
  definition: "message text written ahead of time and asked for by name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "notice" },
    { partOfSpeech: "part-of-speech/noun", spelling: "notices" },
  ],

  extends: ["page-type/page"],
  parts: ["file-property/notice-text", "module/compose-notices", "text-property/notice-warrant"],
  properties: [
    { pageProperty: "file-property/notice-text", required: true, many: false },
    { pageProperty: "text-property/notice-warrant", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice arrives as a turn of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice's words are written before the moment the notice is sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is asked for by its slug rather than by a heading inside a document.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One notice is one page rather than one section of a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice the supervisor hands to a respawned seat opens with `[supervisor]`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The fleet's hooks tell a composed prompt from Alan at the keyboard by that opening marker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice that arrives on a message row has no opening marker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice edited here reaches a seat the next time that seat is resumed.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The notices a seat is resumed with exist as pages under this type.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
