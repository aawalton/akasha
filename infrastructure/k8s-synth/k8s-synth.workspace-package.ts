import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const k8sSynth = {
  id: "01a06810-0b68-71f7-8b6c-5277128c7a3d",
  pageTypeSlug: "workspace-package",
  slug: "k8s-synth",
  definition: "the Kubernetes YAML the synth files in a checkout generate",
  manifest: "json",
  partSlugs: [
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
      statement: "A generated manifest is committed rather than made at deploy time.",
    },
    {
      invariantKind: "departure",
      statement: "A synth file is found by the globs rather than by a list naming each one.",
    },
  ],
} as const satisfies WorkspacePackage
