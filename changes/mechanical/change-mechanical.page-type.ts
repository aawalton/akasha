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
    "change-mechanical-file/move-file",
    "change-mechanical-file/remove-file",
    "change-mechanical-file/remove-code-file",
    "change-mechanical-file/remove-page-file",
    "change-mechanical-code/rename-imports",
    "change-mechanical/change-page-property",
    "change-mechanical/change-page-property-relation",
    "change-mechanical-file/add-file",
    "change-mechanical-file/add-code-file",
    "change-mechanical-file/add-page-file",
    "change-mechanical-file/add-page-type-file",
    "change-mechanical-data/add-property-value",
    "change-mechanical-file/add-page-property-file",
    "change-mechanical-file/change-file",
    "change-mechanical-folder/remove-page",
    "change-mechanical-folder/remove-page-type",
    "change-mechanical/remove-property-value",
    "change-mechanical-code/rename-export",
    "change-mechanical-code/rename-local-variable",
    "change-mechanical-data/rename-page-slug",
    "change-mechanical-file/rename-path",
    "change-mechanical-code/rename-property-signature",
    "change-mechanical-manifest/rename-manifest-ways",
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
  ],
} as const satisfies PageType
