import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Icon } from "../../../temper/temper-things/properties/icon.text-property.ts"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { Seq } from "../daily/wake-days/properties/seq.number-property.ts"
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
  slug: "session-activity",
  definition: "a kind of thing Alan spends his time on",
  pluralSlug: "session-activities",
  extendsSlug: "page-type/page",
  partSlugs: ["number-property/default-difficulty"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "default-difficulty", required: true, many: false },
    { pagePropertySlug: "icon", required: false, many: false },
    { pagePropertySlug: "seq", required: false, many: false },
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
