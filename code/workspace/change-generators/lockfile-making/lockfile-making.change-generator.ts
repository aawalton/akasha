import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const lockfileMaking = {
  id: "01a0d4e5-72fa-7d3b-aac3-31edade0aa68",
  type: "page-type/change-generator",
  slug: "lockfile-making",
  definition: "the lockfile a change's manifests warrant, made again before the change lands",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifests and lockfile the change turns are read off the change as rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest moved reads as a manifest going and a manifest arriving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The making itself is the one `manifest-locking` does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change naming no base commit is left alone.",
    },
  ],
} as const satisfies ChangeGenerator
