import type { WorkstationService } from "../workstation-service.page-type.ts"

export const ciContainerDispatcher = {
  id: "01a06829-0193-7c59-b623-095f0da02df5",
  pageTypeSlug: "workstation-service",
  slug: "ci-container-dispatcher",
  definition: "the service placing a step waiting to be dispatched into a container on the cluster",
  runs: ["env CI_STICKY_PINNING_ENABLED=1 bun services/ci-container-dispatcher.ts"],
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A step's `definition` is a mapping a query does not return, so the sidecar holds it.",
    },
    {
      invariantKind: "departure",
      statement: "A `definition`'s inner keys are spelled as page keys are.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here takes a step past `launching`.",
    },
    {
      invariantKind: "departure",
      statement: "A capacity read that fails admits nothing that tick.",
    },
    {
      invariantKind: "departure",
      statement:
        "A container this made is charged against its node's room until the cluster reports it.",
    },
    {
      invariantKind: "departure",
      statement: "Every step of one pipeline is bound to the node its preparation ran on.",
    },
    {
      invariantKind: "gap",
      statement: "Something carries a step from `launching` to its verdict.",
    },
    {
      invariantKind: "gap",
      statement: "Every service a pipeline takes runs from the workstation.",
    },
  ],
} as const satisfies WorkstationService
