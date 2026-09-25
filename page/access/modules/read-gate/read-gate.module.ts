import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readGate = {
  id: "01a0c548-c02e-7339-91e3-4f4b0e3874cf",
  type: "page-type/module",
  slug: "read-gate",
  definition: "what the reader a read is made for may reach",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read is made for a reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader rides with a read rather than being passed down every call between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How the reader riding with a read is found is registered from the side that knows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a reader may reach is handed in, and no grant is read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the runtime, so a browser loads this as a server does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read no reader rides with reaches everything, as a command run by hand does.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type withheld from a reader stops that read rather than answering no pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A narrow rides into the question the pages are asked rather than trimming the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narrows on one key are asked as one question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narrows disagreeing on the key stop the read rather than widening to both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A narrow on a key the page type does not carry is refused rather than reaching no pages.",
    },
  ],
} as const satisfies Module
