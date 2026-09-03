import type { Module } from "@akasha/code-system/module"

export const surplusFallTicking = {
  id: "01a0697e-ded3-7147-92a2-3c8650eaf635",
  pageTypeSlug: "module",
  slug: "surplus-fall-ticking",
  definition:
    "the tick weighing today's surplus against the night's, telling Alan each rung it falls",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung is said only where it is worse than the worst rung already said today.",
    },
    {
      invariantKind: "departure",
      statement: "What was already said today is read off the notifications already sent.",
    },
    {
      invariantKind: "departure",
      statement: "A notification names its rung in its own source.",
    },
    {
      invariantKind: "departure",
      statement: "The rung is not marked a second time on the day's own page.",
    },
    {
      invariantKind: "gap",
      statement: "Two writes for one fact would let the second fail after the first succeeded.",
    },
    {
      invariantKind: "departure",
      statement:
        "A notification's day is found by running its sent-at through the eso-day reckoning.",
    },
    {
      invariantKind: "gap",
      statement: "A window of timestamps would drift from where Alan's day begins.",
    },
    {
      invariantKind: "departure",
      statement: "A feed that cannot be read is thrown on rather than read as nothing said today.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working at the ceiling ends rather than letting a second begin beside it.",
    },
    {
      invariantKind: "constraint",
      statement: "Only the plain helpers are tested here.",
    },
  ],
} as const satisfies Module
