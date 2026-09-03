import type { Module } from "@akasha/code-system/module"

export const containerDispatching = {
  id: "01a0686a-7a57-745f-bdd4-fbcc31582064",
  pageTypeSlug: "module",
  slug: "container-dispatching",
  definition: "a step waiting to be dispatched placed into a container on the cluster",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One workstation process places every step, and each tick reads the step pages standing at dispatching.",
    },
    {
      invariantKind: "departure",
      statement: "Where a step's container goes is decided from what each ci node has room for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step whose container is created is written to launching beside the name of the container it was launched in.",
    },
    {
      invariantKind: "departure",
      statement: "Step, workflow and pipeline state stands in pages under the memory repository.",
    },
    {
      invariantKind: "departure",
      statement:
        "Everything that moves during a run is held in the uncommitted sidecar beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "The step containers themselves stay on the cluster.",
    },
    {
      invariantKind: "departure",
      statement: "The cluster is reached over its API server with a service-account token.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick weighs no more dispatching steps than its scan limit, oldest first within a branch tier.",
    },
    {
      invariantKind: "departure",
      statement:
        "Sticky pinning binds a branch pipeline's steps to one node, and without it each step goes wherever there is the most room.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working when its ceiling passes ends the process rather than letting a second one start beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The loop runs until it is asked to stop, and a stop ends it at the next boundary.",
    },
  ],
} as const satisfies Module
