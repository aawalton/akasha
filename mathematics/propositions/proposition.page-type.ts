import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
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
  extends: ["page-type/page"],
  parts: [
    "file-property/statement",
    "select-property/proposition-kind",
    "select-property/proposition-status",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "select-property/proposition-kind", required: true, many: false },
    { pagePropertySlug: "select-property/proposition-status", required: true, many: false },
    { pagePropertySlug: "file-property/statement", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A proposition's statement sits in its own file rather than in a value beside that file.",
    },
    {
      invariantKind: "departure",
      statement: "An adopted proposition is chosen rather than proved.",
    },
    {
      invariantKind: "departure",
      statement: "An adopted proposition has no proof.",
    },
    {
      invariantKind: "absence",
      statement: "A proposition names no proof that attempts that proposition.",
    },
  ],
} as const satisfies PageType
