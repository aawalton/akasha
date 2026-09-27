import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const imageIntelligence = {
  id: "01a0de72-77be-7c13-80f8-8de70a92f5de",
  type: "page-type/domain",
  slug: "image-intelligence",
  definition: "how a service is used to read what a picture shows",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Claude's own vision judges a picture below Alan's quality bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan judges the quality of a picture himself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Pictures are read on the MacBook rather than the workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Qwen3.6-35B-A3B Abliterated Heretic at Q4_K_M reads a picture, served by llama.cpp.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A face names a persona only where ArcFace buffalo_l, antelopev2 and AdaFace agree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each of the three scores the face at least 0.55 against her anchor and 0.12 above the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture names a persona only where its faces match exactly one persona.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A face of no persona still scores up to about 0.6 against some persona's anchor.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "JoyCaption Beta One misjudges the closeness rung and miscounts the people shown.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Stock Qwen3.6-35B-A3B gets clothing wrong more often than the Heretic build.",
    },
  ],
} as const satisfies Domain
