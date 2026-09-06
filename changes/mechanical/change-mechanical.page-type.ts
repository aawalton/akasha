import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"
import type { GuardSlugs } from "../properties/guard-slugs.relation-property.ts"

export type ChangeMechanical = Change & {
  guardSlugs?: readonly GuardSlugs[]
  runsChecks: false
  readersOweReading: false
  writerOwesReading: false
}

export const changeMechanical = {
  id: "01a078e8-e0c0-7001-9d36-808d02d6c285",
  pageTypeSlug: "page-type",
  slug: "change-mechanical",
  definition: "a change another change composes rather than a command line reaches",
  pluralSlug: "change-mechanical",
  extendsSlug: ["page-type/change"],
  partSlugs: [
    "change-mechanical/move-file",
    "change-mechanical/remove-file",
    "change-mechanical/repoint-imports",
    "change-mechanical/restate-value",
    "change-mechanical/add-file",
    "change-mechanical/change-file",
    "change-mechanical/remove-page",
    "change-mechanical/remove-page-type",
    "change-mechanical/remove-property-value",
    "change-mechanical/rename-export",
    "change-mechanical/rename-local-variable",
    "change-mechanical/rename-page-slug",
    "change-mechanical/rename-path",
    "change-mechanical/rename-property-signature",
    "change-mechanical/respell-export",
    "relation-property/guard-slugs",
  ],
  properties: [
    {
      pagePropertySlug: "relation-property/guard-slugs",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A mechanical change is reached by another change rather than by a command.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change runs no check of its own.",
    },
  ],
} as const satisfies PageType
