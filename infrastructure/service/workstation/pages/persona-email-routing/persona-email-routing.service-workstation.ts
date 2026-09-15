import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const personaEmailRouting = {
  id: "01a0a147-4f53-7e7e-8fb1-00a3014534b0",
  type: "service-workstation",
  slug: "persona-email-routing",
  definition: "the service routing a persona's address once her page declares one",
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*-*-* 05:20:00",
    jitterSeconds: 600,
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Declaring an address on a persona page is all anyone does to route it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rule is taken away or turned off by this service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run here writes, because a dry run nobody reads routes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run whose token is refused fails the unit rather than passing quietly.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run over a zone already in step writes nothing, so a daily run costs one read.",
    },
  ],
} as const satisfies ServiceWorkstation
