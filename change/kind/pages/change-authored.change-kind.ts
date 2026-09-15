import type { ChangeKind } from "akasha/change/kind/change-kind.page-type.types.ts"

export const changeAuthored = {
  id: "01a05df1-e262-7648-bbe1-061d37bd706d",
  type: "page-type/change-kind",
  slug: "change-authored",
  definition: "a change composed by an agent",
  runsChecks: true,
  writerOwesReading: true,
  readersOweReading: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An authored change is refused until its required reading is read.",
    },
  ],
} as const satisfies ChangeKind
