import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const couplesTherapy = {
  id: "01a16edd-ac15-7a21-ad13-ce45952dfc04",
  type: "page-type/domain",
  slug: "couples-therapy",
  definition: "the sessions Alan and Jenny hold together with a therapist",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The therapist answers to Alan and Jenny together, and to neither alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The therapist's seat states no person, because the seat answers to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every message the therapist is sent names the spouse who sent it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Neither spouse has a channel the other cannot read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The therapist reads no page Jenny cannot read.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The therapist is the default persona until Alan names another.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Alan and Jenny are both autistic and have ADHD, and Alan has total aphantasia.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Alan and Jenny are members of The Church of Jesus Christ of Latter-day Saints.",
    },
  ],
  createdAt: "2026-10-24T17:03:03.699Z",
  updatedAt: "2026-10-24T17:03:03.699Z",
} as const satisfies Domain
