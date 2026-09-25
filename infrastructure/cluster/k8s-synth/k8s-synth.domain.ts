import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const k8sSynth = {
  id: "01a06810-0b68-71f7-8b6c-5277128c7a3d",
  type: "page-type/domain",
  slug: "k8s-synth",
  definition: "how code writes manifests for Kubernetes",
  parts: [
    "module/generated-file",
    "module/synth-discovery",
    "module/synth-drift",
    "module/synth-loading",
    "module/synth-manifests",
    "module/synth-running",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated manifest is written by the synth run rather than committed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A synth file is the code file of a `manifest` page the index answers.",
    },
  ],
} as const satisfies Domain
