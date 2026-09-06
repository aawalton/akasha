import type { Change } from "../../change.page-type.ts"
import type { ChangeKind } from "../change-kind.page-type.ts"

export type ChangeAuthored = Change & {
  runsChecks: true
  readersOweReading: true
  writerOwesReading: true
}

export const changeAuthored = {
  id: "01a05df1-e262-7648-bbe1-061d37bd706d",
  pageTypeSlug: "change-kind",
  slug: "change-authored",
  definition: "a change composed by an agent",
  pluralSlug: "change-authored",
  extendsSlug: ["page-type/change"],
  runsChecks: true,
  writerOwesReading: true,
  readersOweReading: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An authored change is refused until its required reading is read.",
    },
  ],
} as const satisfies ChangeKind
