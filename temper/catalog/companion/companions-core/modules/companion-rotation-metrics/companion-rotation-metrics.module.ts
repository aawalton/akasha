import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRotationMetrics = {
  id: "01a06152-c2cf-78e0-86fc-3c00f49037b8",
  type: "page-type/module",
  slug: "companion-rotation-metrics",
  definition:
    "derivation of dps, hps, sps and tps metric entries from a simulated companion rotation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Buff uptime scales each damage multiplier additively rather than compounding.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The light-attack skill id is skipped in both the dps and the tps pass.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every dps, hps and sps metric worked out from a rotation is stated, a zero included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing metric value is refused, naming that metric.",
    },
  ],
} as const satisfies Module
