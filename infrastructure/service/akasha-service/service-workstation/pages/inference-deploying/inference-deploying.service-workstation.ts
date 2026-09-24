import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const inferenceDeploying = {
  id: "01a09b0e-376c-70a6-9838-96e1f3f656a1",
  type: "page-type/service-workstation",
  slug: "inference-deploying",
  definition: "the service putting the inference kind up once a commit changes its source",
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 10,
    startTimeoutSeconds: 3900,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One kind is put up by this service, and the code beside this page names that kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An inference deploy reaches the host over SSH and boots out the model server it replaces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service already holding the hash asked for is put up without being booted out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing waits for a request in flight before that boot out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick with every inference service up to date puts nothing up, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
