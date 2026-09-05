import type { Module } from "@akasha/code-system/module"

export const surplusFallNotifying = {
  id: "01a0686a-7a57-7e6e-8a26-5e4ca27ca43d",
  pageTypeSlug: "module",
  slug: "surplus-fall-notifying",
  definition: "the day eating into the night, told to Alan once per rung it falls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every tick reads the one readout in the surplus fall group two ways for today and compares the two.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the day opened is what Alan slept, placed on the readout's own scale, before anything the day costs has come off it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the day stands is the readout's reading now, and a stand below the open is a fall.",
    },
    {
      invariantKind: "departure",
      statement: "A rung is said only where it is worse than the worst rung already said today.",
    },
    {
      invariantKind: "departure",
      statement:
        "What was already said today is read back off the notifications already sent, each of which names its rung in its own source.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day dropping two rungs between ticks says the rung it reached and never the rung between.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that recovers and falls again says nothing the second time.",
    },
    {
      invariantKind: "departure",
      statement:
        "The readout, its scale and the day's reading are read on the tick rather than compiled in, so a threshold Alan moves is honoured on the next tick rather than on a deploy.",
    },
    {
      invariantKind: "departure",
      statement: "What this module writes is a notification, and nothing here knows about devices.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working when the ceiling is reached ends the process rather than leaving a second tick to start beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Enough thrown ticks in a row end the process non-zero, while one thrown tick is a store blinking.",
    },
    {
      invariantKind: "departure",
      statement:
        "The loop runs until stopped, and SIGTERM and SIGINT both end it at its next boundary.",
    },
    {
      invariantKind: "gap",
      statement:
        "The readout and its scale are asked of the pages system service and the day's reading of the page query service, while code running on the workstation reaches pages data directly.",
    },
  ],
} as const satisfies Module
