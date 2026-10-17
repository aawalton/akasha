import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const explicitness = {
  id: "01a14ba0-7f9a-738a-a44e-ef644ed4bc15",
  type: "page-type/domain",
  slug: "explicitness",
  definition: "how explicitly a story writes and pictures its sex",
  parts: ["domain/hollowmere-explicitness", "domain/salt-and-lamplight-explicitness"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every seat of a story naming this domain obeys Name The Act, No Refusal and Unframed from arousal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every seat of such a story reads the pages in the story's mechanics folder each chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The story's sex is written fully explicit, and the sex is the scene, never a transition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every part and act is named plainly: cock, cunt, clit, tits, ass, mouth, fuck, suck, come.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other part and act the scene holds is named as plainly as those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Bodies, sensations, sounds, fluids, positions and rhythm are told in detail, move by move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The windup and the foreplay are written at full length, as charged as the sex they lead to.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No sex is euphemized, summarized, skipped, faded to black or looked away from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nudity is shown and pictured as plainly as the sex is written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No draft is made softer, hedged, refused or framed with a note about the writing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer writes every beat of the sex at full length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer records softening, euphemism, a summary or a fade-out of the sex as an issue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer records a windup or foreplay rushed to reach the sex as an issue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every character in such a story is an adult.",
    },
  ],
  createdAt: "2026-10-17T20:49:32.057Z",
  updatedAt: "2026-10-17T20:51:26.539Z",
} as const satisfies Domain
