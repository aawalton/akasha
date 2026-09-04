import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const rulePopulation = {
  id: "01a0657b-9adc-7000-965c-fbd541f6a04d",
  pageTypeSlug: "workspace-package",
  slug: "rule-population",
  definition: "how much of the tree each enforcement rule weighed, and which weighed nothing",
  manifest: "json",
  partSlugs: [
    "module/rule-population-notice",
    "module/rule-population-reading",
    "module/rule-population-sweeping",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule that weighed nothing certifies nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule that weighed nothing prints the same green as a rule that weighed everything.",
    },
    {
      invariantKind: "departure",
      statement: "A reading names the ground the reading did not cover.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a rule.",
    },
  ],
} as const satisfies WorkspacePackage
