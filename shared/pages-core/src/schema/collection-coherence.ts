import type { CoherenceRule } from "./coherence-rules"

export const COLLECTION_TEMPLATE_COHERENCE_RULES: readonly CoherenceRule[] = [
  {
    kind: "numericEqualityWhenPresent",
    whenPresent: "completedAt",
    left: "progress",
    right: "length",
  },
]
