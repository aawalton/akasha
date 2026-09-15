import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const harnessWire = {
  id: "01a08b9e-4c10-7c47-9cc1-698db3594c89",
  type: "module",
  slug: "harness-wire",
  definition: "the protocol the editor and its bun server speak, and how stale an answer may get",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both ends read the protocol from here rather than from numbers of their own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The editor's node host imports this module as the bun server does.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a Bun global.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The module has names and numbers alone.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A stated lease that is not a positive number is the default.",
    },
  ],
} as const satisfies Module
