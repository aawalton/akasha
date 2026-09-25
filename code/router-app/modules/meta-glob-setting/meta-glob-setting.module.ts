import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metaGlobSetting = {
  id: "01a0d89a-f8c5-7864-809e-3b26e1dd34ce",
  type: "page-type/module",
  slug: "meta-glob-setting",
  definition: "giving bun the bundler's eager glob, which bun does not carry",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Bun carries no glob of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bun reads a call to the bundler's glob as a call to the function this module sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root bunfig.toml preloads the module for a run and for a test run.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A bun started outside the root reads no root bunfig.toml, so that bun has no glob.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pattern is read against the folder of the file calling the glob, as the bundler reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file found is keyed by its path from that folder, as the bundler keys it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glob taken other than eagerly is refused.",
    },
  ],
} as const satisfies Module
