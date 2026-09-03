import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { DefaultDifficulty } from "./properties/default-difficulty.number-property.ts"

export type SessionActivity = Page & {
  title: Title
  defaultDifficulty: DefaultDifficulty
}

export const sessionActivity = {
  id: "01a0657a-f73c-734d-8371-f4d768448523",
  pageTypeSlug: "page-type",
  slug: "session-activity",
  definition: "a kind of thing Alan spends his time on",
  pluralSlug: "session-activities",
  extendsSlug: "page-type/page",
  partSlugs: ["number-property/default-difficulty"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "default-difficulty", required: true, many: false },
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
