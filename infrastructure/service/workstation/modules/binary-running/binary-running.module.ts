import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const binaryRunning = {
  id: "01a091ac-021e-7000-9f2e-0d8a8f5ea712",
  type: "module",
  slug: "binary-running",
  definition: "a foreign binary run as the whole of a service",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The binary and the arguments it is handed are named by one list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The binary is handed the environment the service has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The binary writes to the streams the service was given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A term or an interrupt reaching the service reaches the binary.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The service waits for the binary rather than leaving on the signal itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The service leaves on the code the binary left on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A binary a signal ended leaves the service on the code that signal makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no binary is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here follows a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here starts the binary again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says where the binary is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which folder the binary runs in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Importing this module's file runs nothing.",
    },
  ],
} as const satisfies Module
