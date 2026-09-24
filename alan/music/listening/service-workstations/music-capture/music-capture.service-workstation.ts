import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const musicCapture = {
  id: "01a0c48f-9abd-747d-802b-08b86404c189",
  type: "page-type/service-workstation",
  slug: "music-capture",
  definition: "the service carrying every play Alan finished into the pages that keep it",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 60,
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Spotify gives back the fifty plays before the call and no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour holds fewer plays than that, so an hourly run loses none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run takes the plays past the newest play already filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that filed nothing new is a run that succeeded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run files the plays and then carries each play onto the track played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that filed no play carries the tracks a sweep filed since the last run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run takes the own length off each covered release once its tracks carry it.",
    },
  ],
} as const satisfies ServiceWorkstation
