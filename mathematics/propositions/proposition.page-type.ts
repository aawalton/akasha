import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { PropositionKind } from "./properties/proposition-kind.select-property.ts"
import type { PropositionStatus } from "./properties/proposition-status.select-property.ts"
import type { Statement } from "./properties/statement.file-property.ts"

export type Proposition = Page & {
  title: Title
  propositionKind: PropositionKind
  propositionStatus: PropositionStatus
  statement?: Statement
}

export const proposition = {
  id: "01a06575-c2ab-7655-98f1-b3163771f0dc",
  pageTypeSlug: "page-type",
  slug: "proposition",
  definition: "one statement in the formal system Alan is building",
  pluralSlug: "propositions",
  extendsSlug: "page-type/page",
  partSlugs: [
    "file-property/statement",
    "select-property/proposition-kind",
    "select-property/proposition-status",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "proposition-kind", required: true, many: false },
    { pagePropertySlug: "proposition-status", required: true, many: false },
    { pagePropertySlug: "statement", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A proposition's statement stands in its own file rather than in a value beside it.",
    },
    {
      invariantKind: "departure",
      statement: "An adopted proposition is chosen rather than proved, and carries no proof.",
    },
    {
      invariantKind: "absence",
      statement: "A proposition names no proof that attempts it.",
    },
  ],
} as const satisfies PageType
