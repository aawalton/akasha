import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const esoSandboxManifestWriting = {
  id: "01a0d8b4-e3a6-7c78-84a2-da4f938d2e20", type: "page-type/change-generator",
  slug: "eso-sandbox-manifest-writing",
  definition: "the sandbox manifest, written again from the game's sandbox capture",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest is written by a machine once a capture of the sandbox is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A standard global the game answers `nil` for is a global the sandbox strips.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A standard library the game holds no table for is a namespace wholly stripped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each library the game holds a table for gets a list of the members it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every list is sorted, so a capture that moved nothing writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest is worked out again only where the capture or the manifest moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hand edit to the manifest is written over from the capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With no capture kept, the manifest is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body is read through the change rather than off the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies ChangeGenerator
