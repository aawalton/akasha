import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const sweepGradedFImages = {
  id: "01a0dedb-abbe-7769-aaa3-23a1ad87e569",
  type: "page-type/service-workstation",
  slug: "sweep-graded-f-images",
  definition: "the service deleting every image graded `F` fifteen minutes ago or more",
  enabled: true,
  needsSecrets: false,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 900,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick runs every five minutes, so an image goes at most twenty minutes after its grade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick turns the sweeping module's own sweep rather than a sweep written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick names in the unit's log every image graded `F` that another page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that finds no image to delete lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick that cannot delete an image fails the unit.",
    },
  ],
} as const satisfies ServiceWorkstation
