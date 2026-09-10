import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Icon } from "../../../temper/things/properties/icon.text-property.ts"
import type { Seq } from "../daily/days/properties/seq.number-property.ts"
import type { DefaultDifficulty } from "./properties/default-difficulty.number-property.ts"

export type SessionActivity = Page & {
  title: Title
  defaultDifficulty: DefaultDifficulty
  icon?: Icon
  seq?: Seq
}

export const sessionActivity = {
  id: "01a06589-d117-759e-b934-fd346ffba4fd",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "session-activity",
  definition: "a kind of thing Alan spends his time on",
  pluralSlug: "session-activities",
  extends: ["page-type/page"],
  parts: ["number-property/default-difficulty"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/default-difficulty", required: true, many: false },
    { pageProperty: "text-property/icon", required: false, many: false },
    { pageProperty: "number-property/seq", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A session naming no activity states its own difficulty instead.",
    },
    {
      invariantKind: "departure",
      statement: "An activity is matched to a session by the session's title.",
    },
  ],
} as const satisfies PageType
