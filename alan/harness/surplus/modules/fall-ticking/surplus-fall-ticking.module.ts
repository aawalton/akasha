import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const surplusFallTicking = {
  id: "01a0697e-ded3-7147-92a2-3c8650eaf635",
  type: "page-type/module",
  slug: "surplus-fall-ticking",
  definition:
    "the tick weighing today's surplus against the night's, telling Alan each rung it falls",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rung is said only where that rung is worse than the worst rung already said today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs already said today are read off the notifications already sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notification names its rung in its own source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rung is not marked a second time on the day's own page.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Two writes for one fact would let the second fail after the first succeeded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notification's day is found by running its sent-at through the eso-day reckoning.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A window of timestamps would drift from where Alan's day begins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feed that cannot be read is thrown on rather than taken as nothing said today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick still working at the ceiling ends rather than letting a second begin beside that tick.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only the plain helpers are tested here.",
    },
  ],
} as const satisfies Module
