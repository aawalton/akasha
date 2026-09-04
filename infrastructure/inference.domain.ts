import type { Domain } from "../domains/domain.page-type.ts"

export const inference = {
  id: "01a0658b-0f02-7dbe-9db7-b3d04c961dd5",
  pageTypeSlug: "domain",
  slug: "inference",
  definition: "the services that run models and keep a record of every run",
  partSlugs: [
    "domain/generation",
    "page-type/inference-run",
    "workspace-package/inference-clients",
    "workspace-package/inference-pool",
    "workspace-package/inference-runs",
    "workspace-package/voice-inference",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Inference runs on machines outside the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "An inference machine is reached over the private network.",
    },
    {
      invariantKind: "departure",
      statement: "One model is loaded at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Loading a second model evicts the first.",
    },
    {
      invariantKind: "departure",
      statement: "A few services are marked warm and are not evicted for each other.",
    },
    {
      invariantKind: "departure",
      statement: "One inference runs at a time.",
    },
    {
      invariantKind: "departure",
      statement: "How many models are resident does not change how many inferences run at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A model is loaded before its service reports healthy rather than on the first request.",
    },
  ],
} as const satisfies Domain
