import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "../../domain.page-type.ts"

export type ProseFrame = Domain

export const proseFrame = {
  id: "01a08241-f81d-7e21-8584-c7cc1ab6cf98",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "prose-frame",
  definition: "which construction one word is written in",
  pluralSlug: "prose-frames",
  parts: [
    "prose-frame/fronted",
    "prose-frame/object",
    "prose-frame/participle",
    "prose-frame/placed",
  ],
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A frame is read off a sentence's tree rather than off the words in order.",
    },
    {
      invariantKind: "departure",
      statement: "One word in one sentence is in one frame.",
    },
    {
      invariantKind: "departure",
      statement: "A word no frame here names is no construction Standard Agent English rewrites.",
    },
  ],
} as const satisfies PageType
