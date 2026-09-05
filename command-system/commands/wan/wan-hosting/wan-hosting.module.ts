import type { Module } from "@akasha/code-system/module"

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
        "The port, the data directory and the scorer's image are read from the environment.",
    },
    {
      invariantKind: "departure",
      statement:
        "An environment naming none of those is answered with a default rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A program that will not start is answered as nothing rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "ffprobe answers how many frames a clip holds and how large they are.",
    },
    {
      invariantKind: "departure",
      statement: "An ffprobe ending at anything but zero is answered with the last line it wrote.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the GPU.",
    },
  ],
} as const satisfies Module
