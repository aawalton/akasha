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
    "page-type/change-mechanical-code",
    "page-type/change-mechanical-data",
    "page-type/change-mechanical-text",
    "page-type/change-mechanical-manifest",
    "page-type/change-mechanical-file-content",
    "change-mechanical-file/move-file",
    "change-mechanical-file/remove-file",
    "change-mechanical-file/remove-file-code",
    "change-mechanical-file/remove-file-page",
    "change-mechanical-code/change-imports",
    "change-mechanical-text/change-page-property",
    "change-mechanical-data/change-page-property-relation",
    "change-mechanical-file/add-file",
    "change-mechanical-file/add-file-code",
    "change-mechanical-file/add-file-page",
    "change-mechanical-file/add-file-page-type",
    "change-mechanical-data/add-property-value",
    "change-mechanical-file/add-file-page-property",
    "change-mechanical-file/change-file",
    "change-mechanical-folder/remove-page-type",
    "change-mechanical-data/remove-property-value",
    "change-mechanical-code/rename-export",
    "change-mechanical-code/rename-local-variable",
    "change-mechanical-data/rename-page-slug",
    "change-mechanical-file/rename-path",
    "change-mechanical-code/rename-property-signature",
    "change-mechanical-manifest/change-manifest-ways",
    "change-mechanical-manifest/remove-manifest-ways",
    "change-mechanical-data/rename-page-address",
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
