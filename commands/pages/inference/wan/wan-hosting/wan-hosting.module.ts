import type { Module } from "@akasha/code/module"

export const wanHosting = {
  id: "01a072fa-322d-77af-bb5a-82b475102492",
  pageTypeSlug: "module",
  slug: "wan-hosting",
  definition: "the host a wan call runs on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The port and the data directory and the scorer's image are read from the environment.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value the environment does not name is answered with a default rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A program that will not start is answered as nothing rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "ffprobe answers how many frames a clip has and how large those frames are.",
    },
    {
      invariantKind: "departure",
      statement:
        "An ffprobe ending at anything but zero is answered with the last line ffprobe wrote.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the GPU.",
    },
  ],
} as const satisfies Module
