import type { Command } from "akasha/command/command.page-type.types.ts"

export const requestDeny = {
  id: "01a0c4f6-195d-7865-b1b0-9b857ebc4b64",
  type: "page-type/command",
  slug: "request-deny",
  definition: "the command denying a published feature request and giving its boosts back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature request is named by the slug that request declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no feature request is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming other than one word is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A request at any standing other than published is refused, naming the standing it is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request whose page says no standing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request whose page names no proposer is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which points go back to whom is worked out by the spending rules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor given points back gains one transaction carrying those points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A balance written back is the balance the page states plus the points given back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A boost naming a contributor that is no page refuses the whole denial.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor whose page states no balance refuses the whole denial.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request nothing boosts is denied all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Changing the standing is left to the mechanical change of that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says how many contributors were given points back and how many points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says the commit that run landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change that refused is a fault of the data.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The boosts a denied request names are left where they are, as what was spent.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks Alan to confirm.",
    },
  ],
  name: "deny",
  arguments: [{ argument: "argument/feature-request", required: true, saidAs: "word" }],
} as const satisfies Command
