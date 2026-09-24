import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const workstationLoadSampler = {
  id: "01a0a069-4cb1-7622-84e2-3275d4863a72",
  type: "page-type/service-workstation",
  slug: "workstation-load-sampler",
  definition:
    "the service taking the workstation's processor and memory readings every five seconds",
  enabled: true,
  worksWithinSeconds: 180,
  systemd: {
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit running the sampler is simple rather than a timer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round of samples landing each minute is what says this sampler is working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window holds three rounds, so two missed rounds are not yet broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The readouts this sampler keeps show the last reading kept when the sampler dies.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No secret is needed, since nothing here is carried off the workstation.",
    },
  ],
} as const satisfies ServiceWorkstation
