import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Model } from "../seats/properties/model.text-property.ts"
import type { DispatchedAs } from "./properties/dispatched-as.text-property.ts"
import type { SubagentPrompt } from "./properties/subagent-prompt.file-property.ts"

export type SubagentKind = Domain & {
  dispatchedAs: DispatchedAs
  subagentPrompt: SubagentPrompt
  model?: Model
}

export const subagentKind = {
  id: "01a06838-7a9d-7394-97ff-d069ea588410",
  pageTypeSlug: "page-type",
  slug: "subagent-kind",
  definition: "everything a subagent is, apart from the work it is given",
  pluralSlug: "subagent-kinds",
  extendsSlug: ["page-type/domain"],
  partSlugs: [
    "file-property/subagent-prompt",
    "subagent-kind/explore",
    "subagent-kind/general-purpose",
    "text-property/dispatched-as",
  ],
  properties: [
    { pagePropertySlug: "dispatched-as", required: true, many: false },
    { pagePropertySlug: "subagent-prompt", required: true, many: false },
    { pagePropertySlug: "model", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Subagents run from a single kind at the same time.",
    },
    {
      invariantKind: "departure",
      statement: "A kind's prompt is the whole of what a subagent of that kind starts with.",
    },
    {
      invariantKind: "departure",
      statement: "A kind's definition is what a seat reads to choose between kinds.",
    },
    {
      invariantKind: "departure",
      statement: "The name a seat dispatches a kind by is a property rather than the kind's title.",
    },
    {
      invariantKind: "departure",
      statement:
        "A kind stating no model runs on the model of the seat that dispatched the subagent.",
    },
    {
      invariantKind: "gap",
      statement: "A subagent's dispatched-as reaches a kind page rather than standing as text.",
    },
  ],
} as const satisfies PageType
