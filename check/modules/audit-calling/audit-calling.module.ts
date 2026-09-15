import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditCalling = {
  id: "01a0a6a7-6988-7cac-b722-46cd6c843671",
  type: "page-type/module",
  slug: "audit-calling",
  definition: "a round asked of the audit service over HTTP, and the verdicts that come back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A round is asked for at the port the audit service's page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no port leaves the round unasked and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round is asked for over the loopback address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A connection the service refused is asked again, three times in all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round still working is waited on rather than asked for a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait that runs out refuses rather than opening a round beside the first.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An audit runs for a quarter of an hour, so a wait that is over means still working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service answering nothing is refused by name, saying what puts that service up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names the deploy rather than the unit or the daemon behind it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal the service answered is carried back as it was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An answer that names no runs is refused rather than read as a round that ran none.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a check or writes a verdict.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which checks there are.",
    },
  ],
} as const satisfies Module
