import type { Command } from "akasha/command/command.page-type.types.ts"

export const medicineActivity = {
  id: "01a183f2-21fa-71f0-be72-f9795cd94071",
  type: "page-type/command",
  slug: "medicine-activity",
  definition: "what a risk activity costs Alan in disability-adjusted micromorts, as a range",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An activity named is priced for the units asked, or for one unit where none is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No activity named lists every activity, ranked by the median price of one unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price is said as its total, its death part and its disability part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price is said with the 10th and the 90th percentile over the draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An activity's price is said with what its page says its figures assume.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says how many minutes of healthy life one unit of price is for Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The answer says Alan's healthy share of his remaining life is derived, not published.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An activity's micromorts are drawn from the lognormal its low and high bound at 95%.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One micromort of death is one disability-adjusted micromort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An injury costs its rate times its disability weight times the years it lasts, in healthy years.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Healthy years lost are priced against Alan's remaining healthy life expectancy in the same draw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's remaining life expectancy is the mortality model's, on the same draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every activity is priced on one seed, so two activities compare draw for draw.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "activity",
  arguments: [
    { argument: "argument/activity", saidAs: "word" },
    { argument: "argument/units" },
    { argument: "argument/json" },
  ],
  createdAt: "2026-10-28T19:17:26.137Z",
  updatedAt: "2026-10-28T19:17:26.137Z",
} as const satisfies Command
