import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"

export type ChangeAuthored = Change & {
  runsChecks: true
  readersOweReading: true
  writerOwesReading: true
}

export const changeAuthored = {
  id: "01a078e8-e0c0-7000-b3e7-08a0ce4a0c97",
  pageTypeSlug: "page-type",
  slug: "change-authored",
  definition: "a change carrying a body an agent composed",
  pluralSlug: "change-authored",
  extendsSlug: ["page-type/change"],
  partSlugs: ["change-authored/add-file", "change-authored/change-file"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An authored change takes a body no page on disk already holds.",
    },
    {
      invariantKind: "departure",
      statement: "The agent handing that body in owes the readings the paths warrant.",
    },
  ],
} as const satisfies PageType
