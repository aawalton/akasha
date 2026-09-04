import type { Module } from "@akasha/code-system/module"

export const devServerRecording = {
  id: "01a06583-0030-7005-bc8d-acc88730da21",
  pageTypeSlug: "module",
  slug: "dev-server-recording",
  definition: "one dev server said as a row, running or stopped",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dev server with no state file is a row saying stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A value nobody knows is written as a hyphen in a row.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a dev server runs is given by the caller rather than asked here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
