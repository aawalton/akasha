import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"

export type ChangeRestated = Change & {
  runsChecks: true
  readersOweReading: false
  writerOwesReading: true
}

export const changeRestated = {
  id: "01a07995-6671-749e-9364-faa3821ffb76",
  pageTypeSlug: "page-type",
  slug: "change-restated",
  definition: "a change carrying words an agent composed for a meaning already stated",
  pluralSlug: "change-restated",
  extendsSlug: ["page-type/change"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A restated change writes only the words a page states.",
    },
    {
      invariantKind: "departure",
      statement: "The agent handing those words in owes the readings the paths warrant.",
    },
  ],
} as const satisfies PageType
