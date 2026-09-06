import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"

export type ChangeMechanical = Change & {
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
