import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const rulesEngine = {
  id: "01a0657b-9adc-7003-a1af-d02c5457d479",
  type: "domain",
  slug: "rules-engine",
  definition: "what every rule set runs on",

  parts: [
    "domain/rules-engine-field",
    "module/instructions-rule",
    "module/rule-conditions",
    "module/rule-partition",
    "module/rule-vocabulary",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule's match does not depend on the rules beside that rule.",
    },
    {
      invariantKind: "departure",
      statement: "Where two rules match one case, which of them acts is the caller's to settle.",
    },
    {
      invariantKind: "departure",
      statement: "Each rule is one page in a folder.",
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
      statement: "The engine answers of one rule whether that rule matches the case at hand.",
    },
    {
      invariantKind: "departure",
      statement: "The engine reads a run of text as one value of a vocabulary of patterns.",
    },
    {
      invariantKind: "absence",
      statement: "The engine carries out no action.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a rule from disk.",
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
      statement: "A match with no conditions matches everything.",
    },
    {
      invariantKind: "departure",
      statement: "A condition names one property of the page being matched.",
    },
    {
      invariantKind: "departure",
      statement: "A condition names the values that condition accepts.",
    },
    {
      invariantKind: "departure",
      statement: "A condition holds where the property has a value the condition names.",
    },
    {
      invariantKind: "departure",
      statement: "A negated condition holds where the property has no value that condition names.",
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
      invariantKind: "absence",
      statement: "Nothing proves a rule set to be a partition.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing walks the cases a rule set can tell apart.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
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
