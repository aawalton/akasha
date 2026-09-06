import type { PageType } from "../../pages/types/page-type.page-type.ts"
import type { Change } from "../change.page-type.ts"

export type ChangePartial = Change & {
  isCommand: false
  runsChecks: false
}

export const changePartial = {
  id: "01a07656-40f5-7e99-b777-dcc9351443fe",
  pageTypeSlug: "page-type",
  slug: "change-partial",
  definition: "a change run by another change rather than reached from the command line",
  pluralSlug: "change-partial",
  partSlugs: [],
  extendsSlug: ["page-type/change"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A partial change is not reached from the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A partial change runs no check.",
    },
    {
      invariantKind: "departure",
      statement: "A partial change alone is not expected to pass checks.",
    },
    {
      invariantKind: "departure",
      statement: "A partial change is run by a command or by another partial change.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies the calling change lands as a unit are answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A partial change refuses or answers every body the partial change changes.",
    },
  ],
} as const satisfies PageType
