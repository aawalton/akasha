import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const couplesCallRoom = {
  id: "01a16fae-6059-7fab-b175-27c35a114472",
  type: "page-type/module",
  slug: "couples-call-room",
  definition: "the call that joins Alan's phone, Jenny's phone and the live-model therapist",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg is let in only where the call webhook answered its call for a spouse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The therapist's session opens when the first spouse's leg opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The therapist's session ends when the last spouse's leg closes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spouse calling again replaces that spouse's earlier leg.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The therapist is told in a bracketed line whenever a different spouse starts speaking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The therapist is told in a bracketed line when a spouse joins or leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A therapist interrupted mid-reply has the rest of that reply dropped from both legs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session Gemini ends is resumed where it left off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sound is paced to the clock, a frame per leg every 20 milliseconds.",
    },
  ],
  createdAt: "2026-10-24T20:51:01.335Z",
  updatedAt: "2026-10-24T20:51:01.335Z",
} as const satisfies Module
