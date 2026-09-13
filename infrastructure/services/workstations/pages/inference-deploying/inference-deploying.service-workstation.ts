import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const inferenceDeploying = {
  id: "01a09b0e-376c-70a6-9838-96e1f3f656a1",
  type: "service-workstation",
  slug: "inference-deploying",
  definition:
    "the service putting the inference kind up once a commit changes what it is built from",
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 10,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One kind is put up by this service, and the code beside this page names that kind.",
    },
    {
      invariantKind: "departure",
      statement:
        "An inference deploy reaches the host over SSH and boots out the model server it replaces.",
    },
    {
      invariantKind: "departure",
      statement: "A service already holding the hash asked for is put up without being booted out.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing waits for a request in flight before that boot out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick with every inference service up to date puts nothing up, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
