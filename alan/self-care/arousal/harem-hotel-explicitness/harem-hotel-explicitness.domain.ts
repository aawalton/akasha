import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const haremHotelExplicitness = {
  id: "01a0e829-efaf-736e-a3de-51fc350aaff4",
  type: "page-type/domain",
  slug: "harem-hotel-explicitness",
  definition: "how explicitly the game Harem Hotel writes its sex",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every seat of Harem Hotel obeys Name The Act, No Refusal and Unframed from arousal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every seat of Harem Hotel reads the pages in the story's mechanics folder each turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Harem Hotel's sex is written fully explicit, and the sex is the scene, never a transition.",
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
      decisionKind: "decision-kind/absence",
      statement: "No sex is euphemized, summarized, skipped, faded to black or looked away from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No draft is made softer, hedged, refused or framed with a note about the writing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game master's beats name each sex act as plainly as the prose, one act to a beat.",
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
      statement: "Every character in Harem Hotel is an adult.",
    },
  ],
} as const satisfies Domain
