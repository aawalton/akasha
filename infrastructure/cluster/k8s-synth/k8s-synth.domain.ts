import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const k8sSynth = {
  id: "01a06810-0b68-71f7-8b6c-5277128c7a3d",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "k8s-synth",
  definition: "the Kubernetes YAML the synth files in a checkout generate",
  parts: [
    "module/generated-file",
    "module/synth-discovery",
    "module/synth-drift",
    "module/synth-loading",
    "module/synth-manifests",
    "module/synth-running",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generated manifest is written by the synth run rather than committed.",
    },
    {
      invariantKind: "departure",
      statement: "A synth file is found by the globs rather than by a list naming each file.",
    },
  ],
} as const satisfies Domain
