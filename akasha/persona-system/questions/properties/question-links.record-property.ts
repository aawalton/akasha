import type { List } from "@akasha/pages-system/page-property"
import type { RecordProperty } from "@akasha/pages-system/record-property"
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
  slug: "question-links",
  propertySlug: "links",
  definition: "a way to open what a question is asking about",
  properties: [
    { pagePropertySlug: "link-label", required: true, many: false },
    { pagePropertySlug: "link-target", required: true, many: false },
    { pagePropertySlug: "link-platform", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One thing to open is two links where the web and the app reach it apart.",
    },
    {
      invariantKind: "departure",
      statement: "A question carries links only where Alan has to look at something to answer.",
    },
  ],
} as const satisfies RecordProperty
