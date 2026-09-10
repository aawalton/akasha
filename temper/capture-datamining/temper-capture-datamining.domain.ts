import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperCaptureDatamining = {
  id: "01a0608a-15b0-78f6-8e8e-282460347005",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-capture-datamining",
  definition: "the shape a sweep of every item and quest id writes where the game saves it",
  parts: ["module/datamining-payload", "module/datamining-descriptor"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The mining add-on and every reader of the add-on's capture agree here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
