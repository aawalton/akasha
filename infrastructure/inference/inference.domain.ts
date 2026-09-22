import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const inference = {
  id: "01a0658b-0f02-7dbe-9db7-b3d04c961dd5",
  type: "page-type/domain",
  slug: "inference",
  definition: "the services that run models and keep a record of every run",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "inference" }],
  parts: [
    "domain/comfy",
    "domain/generation",
    "domain/inference-client",
    "domain/inference-command",
    "domain/inference-pool",
    "domain/voice-inference",
    "page-type/inference-run",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Inference runs on machines outside the cluster.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inference machine is reached over the private network.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One model is loaded at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loading a second model evicts the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A few services are marked warm and are not evicted for each other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One inference runs at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many models are resident does not change how many inferences run at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A model is loaded before its service reports healthy rather than on the first request.",
    },
  ],
} as const satisfies Domain
