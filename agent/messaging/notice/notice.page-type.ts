import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const notice = {
  id: "019ffe7f-d49d-7000-ba76-13378b883aa0",
  type: "page-type",
  slug: "notice",
  definition: "message text written ahead of time and asked for by name",

  extends: ["page-type/page"],
  parts: ["file-property/notice-text", "module/compose-notices", "text-property/notice-warrant"],
  properties: [
    { pageProperty: "file-property/notice-text", required: true, many: false },
    { pageProperty: "text-property/notice-warrant", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice arrives as a turn of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice's words are written before the moment the notice is sent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice is asked for by its slug rather than by a heading inside a document.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One notice is one page rather than one section of a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice the supervisor hands to a respawned seat opens with `[supervisor]`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The fleet's hooks tell a composed prompt from Alan at the keyboard by that opening marker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice that arrives on a message row has no opening marker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice edited here reaches a seat the next time that seat is resumed.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The notices a seat is resumed with exist as pages under this type.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
