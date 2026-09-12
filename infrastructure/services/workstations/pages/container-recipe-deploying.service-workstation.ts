import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const containerRecipeDeploying = {
  id: "01a0965f-7f5f-73fa-8be8-4758f86ec930",
  type: "service-workstation",
  slug: "container-recipe-deploying",
  definition:
    "the service putting the container recipe kind up once a commit changes what it is built from",
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
      statement: "A recipe's image is built on the cluster's buildkit rather than on this machine.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe whose image the registry holds already is put up without a build.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick with every container recipe up to date puts nothing up, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
