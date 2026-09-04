import type { PageType } from "@akasha/pages-system/page-type"
import type { AgentHook } from "../agent-hook.page-type.ts"

export const inferenceHook = {
  id: "01a00688-389f-7000-ba53-42d361243e1c",
  pageTypeSlug: "page-type",
  slug: "inference-hook",
  definition: "an agent hook that asks a model",
  pluralSlug: "inference-hooks",
  extendsSlug: "page-type/agent-hook",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every inference hook is lagging.",
    },
  ],
} as const satisfies PageType

export type InferenceHook = AgentHook
