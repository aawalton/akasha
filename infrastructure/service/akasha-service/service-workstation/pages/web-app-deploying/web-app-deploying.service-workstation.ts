import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const webAppDeploying = {
  id: "01a09645-42d1-7495-89ba-aacde7d16cf8",
  type: "page-type/service-workstation",
  slug: "web-app-deploying",
  definition: "the service putting the web app kind up once a commit changes its source",
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
        "A web app deploy pushes the commit to origin, builds in the pod, and applies its manifests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The cluster service beside a web app is put up here rather than by the cluster loop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick with every web app up to date puts nothing up, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
