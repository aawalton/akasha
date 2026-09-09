import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Date as ReviewedOn } from "../../alan/track/days/properties/date.text-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Icon } from "../../temper/things/properties/icon.text-property.ts"
import type { ReviewSessionNotes } from "./properties/review-session-notes.file-property.ts"
import type { SessionPersona } from "./properties/session-persona.relation-property.ts"

export type ReviewSession = Page & {
  title: Title
  persona: SessionPersona
  date: ReviewedOn
  notes: ReviewSessionNotes
  icon?: Icon
}

export const reviewSession = {
  id: "01a06743-d160-7001-9131-181af10f9b87",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "review-session",
  definition: "one pass a persona made over the part of Alan's life she watches",
  pluralSlug: "review-sessions",
  extends: ["page-type/page"],
  parts: ["file-property/review-session-notes", "relation-property/session-persona"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/session-persona", required: true, many: false },
    { pageProperty: "text-property/date", required: true, many: false },
    { pageProperty: "file-property/review-session-notes", required: true, many: false },
    { pageProperty: "text-property/icon", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona looking on a day has a single review session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session names the persona who looked rather than the part of Alan's life that persona looked at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session's slug joins the part of Alan's life looked over to the day of the looking.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session's notes are a file beside the session rather than inside the session page.",
    },
    {
      invariantKind: "gap",
      statement: "A session names the part of Alan's life the session passed over.",
    },
  ],
} as const satisfies PageType
