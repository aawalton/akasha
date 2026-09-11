import type { ServiceInference } from "akasha/infrastructure/services/inferences/service-inference.page-type.types.ts"

export const segmentRembg = {
  id: "01a090a2-fddd-7bf0-bfda-019b368cb78b",
  pageTypeSlug: "service-inference",
  type: "service-inference",
  slug: "segment-rembg",
  definition: "the model that cuts a subject out of a picture",
  host: "macbook",
  provision: "segment-rembg-provision",
  pythonVersion: "3.12",
  workdir: "src",
  runs: ["python server.py --host 127.0.0.1 --port 18101"],
  enabled: true,
  port: 8101,
  internalPort: 18101,
  lifecycle: "pool",
} as const satisfies ServiceInference
