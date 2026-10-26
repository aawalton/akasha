import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const royalRoadPages = {
  id: "01a0657f-4492-7001-ad86-00f3e943bd74",
  type: "page-type/module",
  slug: "royal-road-pages",
  definition: "a Royal Road fiction page and chapter page turned into values",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter list is read off the `window.chapters` array the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fiction's title and author are read off the linked-data Book block the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is not always laid out in paragraph tags.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter with no paragraph tag is read by its line breaks instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter that yields a paragraph is read byte for byte as that chapter was before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container that is absent and a container that yields nothing are two readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A request whose connection fails, or that Royal Road answers 403, 429 or 5xx, is sent again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is sent again after five, fifteen and forty-five seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a request still failing on its fourth sending fails the read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request Royal Road answers with any other refusal is not sent again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Royal Road challenges a request sent by the runtime's own fetch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every request to Royal Road is sent by curl.",
    },
  ],
  createdAt: "2026-09-03T04:20:34.578Z",
  updatedAt: "2026-10-26T12:04:59.904Z",
} as const satisfies Module
