import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const comfy = {
  id: "01a06810-0b68-7eaa-8bd1-c312063e493d",
  type: "domain",
  slug: "comfy",
  definition: "what ComfyUI is asked to run",
  parts: ["module/comfy-graph"],
} as const satisfies Domain
