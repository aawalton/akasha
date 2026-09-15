import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const browserReaping = {
  id: "01a0a0f4-a63b-7e62-b70f-6eaed2299de7",
  type: "page-type/module",
  slug: "browser-reaping",
  definition: "the browser a seat's tool server opened, let go once no call reaches that server",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's browser is let go once no browser call has been made for the whole wait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait begins again on any browser call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tool server holding no browser is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tool server is left running so the next call opens a browser again.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What a page does on its own is not a browser call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "The first browser call after a reap fails and the call after that opens a new browser.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page or asks the index.",
    },
  ],
} as const satisfies Module
