import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const rulesEngineField = {
  id: "01a06600-0000-7000-8000-000000000002",
  pageTypeSlug: "domain",
  slug: "rules-engine-field",
  definition: "one property of what a rule set applies to, that a condition can name",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule set declares its own fields.",
    },
    {
      invariantKind: "departure",
      statement: "A condition naming a field the rule set did not declare is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A field's type comes from a set the engine closes.",
    },
    {
      invariantKind: "absence",
      statement: "A rule set invents no field type.",
    },
    {
      invariantKind: "departure",
      statement: "A rule set chooses among the engine's types rather than adding a type.",
    },
    {
      invariantKind: "departure",
      statement: "A field's type decides which comparisons the field takes.",
    },
    {
      invariantKind: "departure",
      statement: "One comparison spelled alike over two types is two comparisons.",
    },
    {
      invariantKind: "departure",
      statement:
        "A condition pairing a field with a comparison the field's type refuses is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A type states how a rule set is proven to cover that type.",
    },
    {
      invariantKind: "absence",
      statement: "There is no boolean field type.",
    },
    {
      invariantKind: "departure",
      statement: "A field with two values is an enum with two values.",
    },
    {
      invariantKind: "departure",
      statement: "A date field holds a calendar date.",
    },
    {
      invariantKind: "departure",
      statement: "A date field takes `is` and `on or after`.",
    },
    {
      invariantKind: "absence",
      statement: "A date is no number.",
    },
    {
      invariantKind: "departure",
      statement: "A date field's comparison takes in the day the comparison names.",
    },
    {
      invariantKind: "departure",
      statement: "An enum field holds a value from a set the rule set names.",
    },
    {
      invariantKind: "departure",
      statement: "An enum field takes `is`.",
    },
    {
      invariantKind: "departure",
      statement: "An enum's set is complete.",
    },
    {
      invariantKind: "absence",
      statement: "Covering an enum needs no residual.",
    },
    {
      invariantKind: "departure",
      statement: "A list field holds many values at once.",
    },
    {
      invariantKind: "departure",
      statement: "A list field takes `contains`.",
    },
    {
      invariantKind: "departure",
      statement: "A list's `contains` asks membership.",
    },
    {
      invariantKind: "absence",
      statement: "A list's `contains` asks no substring.",
    },
    {
      invariantKind: "departure",
      statement: "A list names the type the list's members hold.",
    },
    {
      invariantKind: "departure",
      statement: "A number field holds a count or an amount.",
    },
    {
      invariantKind: "departure",
      statement: "A number field takes `is` and `is above`.",
    },
    {
      invariantKind: "departure",
      statement: "A number field's values divide the line into one more piece than the values.",
    },
    {
      invariantKind: "departure",
      statement: "A text field holds a run of characters.",
    },
    {
      invariantKind: "departure",
      statement: "A text field takes `is` and `starts with` and `ends with` and `contains`.",
    },
    {
      invariantKind: "departure",
      statement: "Two values no condition tells apart are one value to the proof.",
    },
    {
      invariantKind: "departure",
      statement: "No `contains` condition rules out another condition on that field.",
    },
    {
      invariantKind: "gap",
      statement: "No text field takes `contains`.",
    },
    {
      invariantKind: "departure",
      statement: "A normalizer turns a run of raw text into one value out of a bounded set.",
    },
    {
      invariantKind: "departure",
      statement: "A normalizer is a list of patterns.",
    },
    {
      invariantKind: "departure",
      statement: "A normalizer's pattern names one value.",
    },
    {
      invariantKind: "departure",
      statement: "A normalizer is declared as data rather than written as code.",
    },
    {
      invariantKind: "departure",
      statement: "A normalizer's pattern is a run of characters.",
    },
    {
      invariantKind: "absence",
      statement: "A normalizer's pattern is no regular expression.",
    },
    {
      invariantKind: "departure",
      statement: "The longest pattern the text holds names the text's value.",
    },
    {
      invariantKind: "departure",
      statement: "The first pattern alphabetically names the value where two patterns tie.",
    },
    {
      invariantKind: "departure",
      statement: "Text holding no pattern takes a value of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A field a normalizer fills is an enum.",
    },
    {
      invariantKind: "departure",
      statement: "That enum holds the normalizer's values and the value for unpatterned text.",
    },
  ],
} as const satisfies Domain
