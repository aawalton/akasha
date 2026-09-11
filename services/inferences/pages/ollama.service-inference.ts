import type { ServiceInference } from "akasha/services/inferences/service-inference.page-type.types.ts"

export const ollama = {
  id: "01a090a2-cd03-701a-8161-c9b80aff3edc",
  pageTypeSlug: "service-inference",
  type: "service-inference",
  slug: "ollama",
  definition: "the models ollama serves",
  host: "macbook",
  provision: "ollama-provision",
  pythonVersion: "3.12",
  workdir: ".",
  runs: [
    "env OLLAMA_HOST=127.0.0.1:21434 OLLAMA_MODELS=/Users/walton/inference/ollama/models OLLAMA_MAX_LOADED_MODELS=1 /Users/walton/inference/ollama/dist/ollama serve",
  ],
  enabled: true,
  port: 11434,
  internalPort: 21434,
  lifecycle: "pool",
} as const satisfies ServiceInference
