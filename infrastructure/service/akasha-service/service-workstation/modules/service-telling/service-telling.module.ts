import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceTelling = {
  id: "01a0c995-1c76-7a32-9357-a382d356cdac",
  type: "page-type/module",
  slug: "service-telling",
  definition: "the run telling a persona that one named service has just failed",
  code: "ts",
  test: "ts",
  reachedByPath: ["runServiceTelling"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The teller's bundle names this run in a stub rather than importing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name spelled in a stub is reached by path, so this page declares that reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling here is asked for by one service's name rather than found by a sweep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name handed in with its unit suffix is read as the service's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service told inside its cooling is answered without reading systemd or a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit systemd has started again already is told as having failed all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no service page states is told rather than swallowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that is not to be running is told by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cooling, the persona and the ledger here are the ones the watch uses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling for one service takes no other service's entry out of the ledger.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a verdict or a moment beside a service's page.",
    },
  ],
} as const satisfies Module
