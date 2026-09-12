import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const attributesRelayService = {
  id: "01a0687a-f498-78ce-a19b-36b6b2217113",
  type: "service-workstation",
  slug: "attributes-relay-service",
  definition: "the service carrying the six attribute points to the site that shows them",
  runs: [
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/attributes/readouts/attribute-strength/attribute-strength.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/attributes/readouts/attribute-endurance/attribute-endurance.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/attributes/readouts/attribute-constitution/attribute-constitution.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/attributes/readouts/attribute-wisdom/attribute-wisdom.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/attributes/readouts/attribute-intelligence/attribute-intelligence.readout.ts https://alanwalton.com",
    "-bun alan/harness/readouts/relay/readout-relay.module.code.ts alan/attributes/readouts/attribute-charisma/attribute-charisma.readout.ts https://alanwalton.com",
  ],
  enabled: true,
  needsSecrets: true,
  systemd: {
    schedule: "*:2/5",
    jitterSeconds: 30,
    startTimeoutSeconds: 120,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
