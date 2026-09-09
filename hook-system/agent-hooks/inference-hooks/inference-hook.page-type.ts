import type { PageType } from "@akasha/pages/page-type"

export const inferenceHook = {
  id: "01a00688-389f-7000-ba53-42d361243e1c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "inference-hook",
  definition: "an agent hook that asks a model",
  pluralSlug: "inference-hooks",
  extends: ["page-type/agent-hook"],
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every inference hook is lagging.",
    },
  ],
  types: "ts",
} as const satisfies PageType
