import type { Module } from "@akasha/code-system/module"

export const persistentVm = {
  id: "01a06059-2492-704f-948b-8334eefba455",
  pageTypeSlug: "module",
  slug: "persistent-vm",
  definition: "a Lua subprocess started, handed scripts one at a time, and shut down",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The subprocess loads the driver from the file beside the driver's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A start is proved by a handshake script whose answer is known beforehand.",
    },
    {
      invariantKind: "departure",
      statement: "A handshake that hangs is given a deadline rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A start that fails is tried again a fixed number of times.",
    },
    {
      invariantKind: "departure",
      statement: "A failure names the subprocess and what the subprocess did before failing.",
    },
    {
      invariantKind: "departure",
      statement: "What the subprocess wrote to its error stream is kept for that report.",
    },
    {
      invariantKind: "departure",
      statement: "Only the last four kilobytes of the error stream are kept.",
    },
    {
      invariantKind: "departure",
      statement: "A script handed to a closed subprocess is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Closing ends the subprocess input and waits for the subprocess to exit.",
    },
  ],
} as const satisfies Module
