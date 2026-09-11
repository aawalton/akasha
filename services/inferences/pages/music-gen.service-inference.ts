import type { ServiceInference } from "akasha/services/inferences/service-inference.page-type.types.ts"

export const musicGen = {
  id: "01a090a3-3343-7623-808c-2d863b26130c",
  pageTypeSlug: "service-inference",
  type: "service-inference",
  slug: "music-gen",
  definition: "the ACE-Step music model",
  host: "macbook",
  provision: "music-gen-provision",
  pythonVersion: "3.12",
  workdir: "ACE-Step-1.5",
  runs: [
    "bash -c 'export ACESTEP_LM_BACKEND=mlx ACESTEP_CONFIG_PATH=acestep-v15-turbo ACESTEP_LM_MODEL_PATH=acestep-5Hz-lm-1.7B ACESTEP_CHECKPOINTS_DIR=\"$PWD/checkpoints\" TOKENIZERS_PARALLELISM=false; exec acestep-api --host 127.0.0.1 --port 18097'",
  ],
  enabled: true,
  port: 8097,
  internalPort: 18097,
  lifecycle: "pool",
} as const satisfies ServiceInference
