import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const wanHosting = {
  id: "01a072fa-322d-77af-bb5a-82b475102492",
  type: "module",
  slug: "wan-hosting",
  definition: "the host a wan call runs on",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The port and the data directory and the scorer's image are read from the environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A value the environment does not name is answered with a default rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program that will not start is answered as nothing rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The words spawned here are a program's command line rather than a call's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "ffprobe answers how many frames a clip has and how large those frames are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An ffprobe ending at anything but zero is answered with the last line ffprobe wrote.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the GPU.",
    },
  ],
} as const satisfies Module
