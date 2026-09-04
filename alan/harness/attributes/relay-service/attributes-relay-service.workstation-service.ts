import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const attributesRelayService = {
  id: "01a0687a-f498-78ce-a19b-36b6b2217113",
  pageTypeSlug: "workstation-service",
  slug: "attributes-relay-service",
  definition: "the service carrying the six attribute points to the site that shows them",
  runs: [
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/attribute-strength/attribute-strength.readout.ts https://alanwalton.com",
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/attribute-endurance/attribute-endurance.readout.ts https://alanwalton.com",
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/attribute-constitution/attribute-constitution.readout.ts https://alanwalton.com",
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/attribute-wisdom/attribute-wisdom.readout.ts https://alanwalton.com",
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/attribute-intelligence/attribute-intelligence.readout.ts https://alanwalton.com",
    "-bun akasha/readout-system/readout-relay/readout-relay.module.code.ts akasha/readout-system/readouts/pages/attribute-charisma/attribute-charisma.readout.ts https://alanwalton.com",
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 120,
    catchUp: false,
  },
} as const satisfies WorkstationService
