import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"

export type ChangeAgent = Change

export const changeAgent = {
  id: "01a07e9a-630c-75a2-b4ec-5106861a8009",
  pageTypeSlug: "page-type",
  slug: "change-agent",
  definition: "a change an agent reaches by name",
  pluralSlug: "change-agent",
  extends: ["page-type/change"],
  partSlugs: [
    "domain/change-agent-file",
    "domain/change-agent-folder",
    "domain/change-agent-file-content",
    "domain/change-agent-page-property",
    "domain/change-agent-page-type",
    "domain/change-agent-prose",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent change is reached by name rather than by another change.",
    },
    {
      invariantKind: "departure",
      statement: "An agent change reaches the mechanical changes working its bodies out.",
    },
    {
      invariantKind: "absence",
      statement: "An agent change names no guard.",
    },
  ],
} as const satisfies PageType
