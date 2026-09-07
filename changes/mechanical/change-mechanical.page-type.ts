import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"
import type { GuardSlugs } from "./properties/guard-slugs.relation-property.ts"

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
    "page-type/change-mechanical-file",
    "page-type/change-mechanical-folder",
    "page-type/change-mechanical-data",
    "page-type/change-mechanical-manifest",
    "page-type/change-mechanical-file-content",
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
    {
      invariantKind: "departure",
      statement: "A mechanical change is filed under the sub-type naming the thing acted on.",
    },
  ],
} as const satisfies PageType
