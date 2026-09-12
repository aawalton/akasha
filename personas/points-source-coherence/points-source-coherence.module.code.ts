import type { CoherenceRule } from "akasha/pages/core/schema/modules/coherence-rules/coherence-rules.module.code.ts"

export const PERSONA_POINTS_SOURCE_COHERENCE_RULES: readonly CoherenceRule[] = [
  {
    kind: "valueIn",
    key: "pointsSourceKind",
    allowed: [
      "windowed",
      "delta",
      "external",
      "stoplights",
      "manual",
      "direct",
      "seed",
      "unavailable",
    ],
  },
  { kind: "valueIn", key: "pointsSourceAggregate", allowed: ["bytes", "sum", "count", "weighted"] },
  {
    kind: "requires",
    when: { key: "pointsSourceKind", eq: "windowed" },
    require: [["pointsSourceAggregate"]],
  },
  {
    kind: "requires",
    when: { key: "pointsSourceAggregate", eq: "bytes" },
    require: [["pointsPathPrefix", "pointsPathPrefixes"]],
  },
  {
    kind: "requires",
    when: { key: "pointsSourceAggregate", eq: "sum" },
    require: [["pointsSource"], ["pointsSourcePointField"]],
  },
  {
    kind: "requires",
    when: { key: "pointsSourceAggregate", eq: "count" },
    require: [["pointsSource"]],
  },
  {
    kind: "requires",
    when: { key: "pointsSourceAggregate", eq: "weighted" },
    require: [["pointsSource"], ["pointsSourceWeightField"]],
  },
]
