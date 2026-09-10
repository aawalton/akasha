import type { List } from "@akasha/pages/page-property"
import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"
import type { LinkLabel } from "./link-label.text-property.ts"
import type { LinkPlatform } from "./link-platform.select-property.ts"
import type { LinkTarget } from "./link-target.text-property.ts"

export type QuestionLink = {
  label: LinkLabel
  target: LinkTarget
  platform: LinkPlatform
}

export type QuestionLinks = List<QuestionLink>

export const questionLinks = {
  id: "01a06823-89b2-7009-9d8b-67cd69c12142",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "question-links",
  propertySlug: "links",
  definition: "a way to open what a question is asking about",
  properties: [
    { pageProperty: "text-property/link-label", required: true, many: false },
    { pageProperty: "text-property/link-target", required: true, many: false },
    { pageProperty: "select-property/link-platform", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One thing to open is two links where the web and the app reach that thing apart.",
    },
    {
      invariantKind: "departure",
      statement: "A question has links only where Alan has to look at something to answer.",
    },
  ],
} as const satisfies RecordProperty
