import type { generationRuns } from "akasha/inference/generations/logs/properties/generation-runs.file-property.ts"

export type GenerationRuns = (typeof generationRuns.extensions)[number]
