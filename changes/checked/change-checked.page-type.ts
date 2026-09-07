import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"

export type ChangeChecked = Change & {
  runsChecks: true
  readersOweReading: false
  writerOwesReading: false
}

export const changeChecked = {
  id: "01a078e2-5ff6-7000-97f7-499db10ecaee",
  pageTypeSlug: "page-type",
  slug: "change-checked",
  definition: "a change a program composed and the checks judge",
  pluralSlug: "change-checked",
  extendsSlug: ["page-type/change"],
  partSlugs: [
    "change-checked/add-property-value",
    "change-checked/change-page-page-type",
    "change-checked/change-page-property",
    "change-checked/move-page",
    "change-checked/remove-file",
    "change-checked/remove-page",
    "change-checked/remove-page-type",
    "change-checked/remove-property-value",
    "change-checked/rename-code-token",
    "change-checked/rename-package",
    "change-checked/rename-page",
    "change-checked/change-domain-parent",
    "change-checked/remove-package-alias",
    "change-checked/move-folder",
    "change-checked/move-folder-package",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A checked change derives every byte the change writes from a body already standing on disk.",
    },
  ],
} as const satisfies PageType
