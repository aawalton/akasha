import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wanHosting = {
  id: "01a072fa-322d-77af-bb5a-82b475102492",
  type: "page-type/module",
  slug: "wan-hosting",
  definition: "a wan call's host",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The port and the data directory and the scorer's image are read from the environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value the environment does not name is answered with a default rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program that will not start is answered as nothing rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words spawned here are a program's command line rather than a call's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "ffprobe answers how many frames a clip has and how large those frames are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ffprobe ending at anything but zero is answered with the last line ffprobe wrote.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the GPU.",
    },
  ],
} as const satisfies Module
