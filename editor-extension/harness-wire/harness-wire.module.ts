import type { Module } from "@akasha/code/module"

export const harnessWire = {
  id: "01a08b9e-4c10-7c47-9cc1-698db3594c89",
  pageTypeSlug: "module",
  type: "module",
  slug: "harness-wire",
  definition: "the protocol the editor and its bun server speak, and how stale an answer may get",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Both ends read the protocol from here rather than from numbers of their own.",
    },
    {
      invariantKind: "departure",
      statement: "The editor's node host imports this module as the bun server does.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a Bun global.",
    },
    {
      invariantKind: "departure",
      statement: "The module has names and numbers alone.",
    },
    {
      invariantKind: "constraint",
      statement: "A stated lease that is not a positive number is the default.",
    },
  ],
} as const satisfies Module
