import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const rulesEngine = {
  id: "01a0657b-9adc-7003-a1af-d02c5457d479",
  type: "page-type/domain",
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
      invariantKind: "invariant-kind/departure",
      statement: "A rule's match does not depend on the rules beside that rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where two rules match one case, which of them acts is the caller's to settle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each rule is one page in a folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Several rules stating one action are several rules rather than one rule copied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule is carried out by code or by an agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule's kind does not change how the rule matches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A code rule states the actions to take.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent rule leaves the final action to the agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule's kind is the folder the rule is in rather than a key on the rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The engine answers of one rule whether that rule matches the case at hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The engine reads a run of text as one value of a vocabulary of patterns.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The engine carries out no action.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a rule from disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A match is a set of conditions.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every condition of a match must hold for the match to hold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A match with no conditions matches everything.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition names one property of the page being matched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition names the values that condition accepts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition holds where the property has a value the condition names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A negated condition holds where the property has no value that condition names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ways a condition compares a value are a closed set.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No comparison a condition makes is a regular expression.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every comparison has a negated spelling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition compares without regard to case.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing proves a rule set to be a partition.",
    },
    {
      invariantKind: "invariant-kind/absence",
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
