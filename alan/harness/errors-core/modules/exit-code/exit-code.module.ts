import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exitCode = {
  id: "01a05c48-deeb-7015-8c70-41f6bb46fd62",
  type: "module",
  slug: "exit-code",
  definition: "the code a command exits with, and the error types that have one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An operational error may carry the run on another host that raised it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That run is what the host printed before it stopped, and the exit it stopped on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Carrying a run changes no code, the error being the one it already was.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An error raised by no run on another host carries no run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error this module did not classify exits seventy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command exits with a code this module states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command wanting another exit declares its own at four or above.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A code this module states is never given a second meaning.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No command chooses seventy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The catch above every command answers seventy.",
    },
  ],
} as const satisfies Module
