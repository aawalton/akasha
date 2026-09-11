import type { ServiceInference } from "akasha/infrastructure/services/inferences/service-inference.page-type.types.ts"

export const trafficCop = {
  id: "01a090a3-49cd-77e0-94ee-65778e11afc4",
  pageTypeSlug: "service-inference",
  type: "service-inference",
  slug: "traffic-cop",
  definition: "the service settling which model is resident on the machine",
  host: "macbook",
  provision: "traffic-cop-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: ["bun run src/server.ts"],
  enabled: true,
  port: 8099,
  lifecycle: "always-on",
} as const satisfies ServiceInference
