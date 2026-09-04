import type { Domain } from "../domains/domains/domain.page-type.ts"

export const rulesEngine = {
  id: "01a06600-0000-7000-8000-000000000001",
  pageTypeSlug: "domain",
  slug: "rules-engine",
  definition: "what every rule set runs on",
  partSlugs: ["page-type/rules-engine-rule-set", "domain/rules-engine-field"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page a rule set applies to matches exactly one rule of that rule set.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's match does not depend on the rules beside that rule.",
    },
    {
      invariantKind: "departure",
      statement: "A more specific rule leaves its matches to a less specific rule as well.",
    },
    {
      invariantKind: "departure",
      statement: "A rule another rule overlaps in part becomes several rules.",
    },
    {
      invariantKind: "departure",
      statement: "Covering what no other rule names takes several rules.",
    },
    {
      invariantKind: "departure",
      statement: "An agent writes the rules that cover what no other rule names.",
    },
    {
      invariantKind: "departure",
      statement: "Each rule is one document in a folder.",
    },
    {
      invariantKind: "departure",
      statement: "Several rules stating one action are several rules rather than one rule copied.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is carried out by code or by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's kind does not change how the rule matches.",
    },
    {
      invariantKind: "departure",
      statement: "A code rule states the actions to take.",
    },
    {
      invariantKind: "departure",
      statement: "An agent rule leaves the final action to the agent.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's kind is the folder the rule is in rather than a key on the rule.",
    },
    {
      invariantKind: "departure",
      statement: "The engine names the rule that matched.",
    },
    {
      invariantKind: "absence",
      statement: "The engine carries out no action.",
    },
    {
      invariantKind: "departure",
      statement: "A match is a set of conditions.",
    },
    {
      invariantKind: "departure",
      statement: "Every condition of a match must hold for the match to hold.",
    },
    {
      invariantKind: "departure",
      statement: "A match holding no conditions matches everything.",
    },
    {
      invariantKind: "departure",
      statement: "A match covers a second match where the first matches what the second matches.",
    },
    {
      invariantKind: "departure",
      statement: "The engine answers that one match covers no other where covering is undecided.",
    },
    {
      invariantKind: "departure",
      statement: "A condition names one property of what is matched.",
    },
    {
      invariantKind: "departure",
      statement: "A condition names the values that condition accepts.",
    },
    {
      invariantKind: "departure",
      statement: "A condition holds where the property carries a value the condition names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A negated condition holds where the property carries no value that condition names.",
    },
    {
      invariantKind: "departure",
      statement: "A negated condition split into one condition a value matches the same things.",
    },
    {
      invariantKind: "departure",
      statement: "A positive condition split into one condition a value matches other things.",
    },
    {
      invariantKind: "departure",
      statement: "The ways a condition compares a value are a closed set.",
    },
    {
      invariantKind: "absence",
      statement: "No comparison a condition makes is a regular expression.",
    },
    {
      invariantKind: "departure",
      statement: "Every comparison has a negated spelling.",
    },
    {
      invariantKind: "departure",
      statement: "A condition compares without regard to case.",
    },
    {
      invariantKind: "departure",
      statement: "A proof shows a rule set to be a partition.",
    },
    {
      invariantKind: "departure",
      statement: "The proof decides every case a rule set can tell apart.",
    },
    {
      invariantKind: "absence",
      statement: "The proof samples no cases that arise.",
    },
    {
      invariantKind: "departure",
      statement: "A case the rule set holds no value of is a case the proof decides.",
    },
    {
      invariantKind: "departure",
      statement: "The proof decides a case with the same matcher the live run uses.",
    },
    {
      invariantKind: "departure",
      statement: "The proof reports a case the proof cannot decide as undecided.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Ask Before Changing",
      act: "Get approval from the person the rules serve before a change, never after.",
      warrant:
        "A rule acts on the next thing it matches, so asking after is asking about what is in force.",
      aids: [
        "Being asked to change it is not approval.",
        "Related changes serving one goal are one change.",
      ],
    },
  ],
} as const satisfies Domain
