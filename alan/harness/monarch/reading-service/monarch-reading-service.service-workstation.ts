import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const monarchReadingService = {
  id: "01a05b42-a2d3-7d02-b6b1-5faa28a7bdba",
  type: "page-type/service-workstation",
  slug: "monarch-reading-service",
  definition: "the service taking Monarch's unreviewed count onto its readout",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 60,
    catchUp: false,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run where Monarch ran out of time lands rather than failing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readout keeps the count it holds until a run takes a fresh one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other refusal is carried out, so a cookie Alan must renew is still seen.",
    },
  ],
} as const satisfies ServiceWorkstation
