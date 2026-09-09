import type { Domain } from "../../../../domains/domain.page-type.ts"

export const monarchEval = {
  id: "01a07740-d031-7503-a291-ce61a5f353a4",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "monarch-eval",
  definition:
    "how far an agent can be trusted to settle a transaction's category, and where it cannot",
  parts: [
    "module/monarch-eval-agent",
    "module/monarch-eval-population",
    "module/monarch-eval-run",
    "module/monarch-eval-score",
    "module/monarch-eval-snapshot",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The question is not whether an agent can categorize but where that agent can be trusted to.",
    },
    {
      invariantKind: "departure",
      statement:
        "The question is whether an agent knows when that agent cannot be trusted to categorize.",
    },
    {
      invariantKind: "departure",
      statement:
        "An agent trusted past its reach spends Jenny's attention on corrections rather than on questions.",
    },
    {
      invariantKind: "absence",
      statement: "No single accuracy figure is reported.",
    },
    {
      invariantKind: "departure",
      statement: "The report delivered is the partition.",
    },
    {
      invariantKind: "departure",
      statement: "Coverage and reliability are reported together within each part.",
    },
    {
      invariantKind: "departure",
      statement: "A row a standing rule reaches is not this project's subject.",
    },
    {
      invariantKind: "constraint",
      statement: "A row with no category anyone chose has no answer to be scored against.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rows with no category anyone chose are the rows this pipeline most exists to serve.",
    },
    {
      invariantKind: "departure",
      statement:
        "The held-out split is a hash of the transaction's own id rather than a stored shuffle.",
    },
    {
      invariantKind: "departure",
      statement: "The prompt is built and revised against the development pool alone.",
    },
    {
      invariantKind: "departure",
      statement: "The held-out pool is read once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A second reading of the held-out pool is refused rather than trusted to anyone's memory.",
    },
    {
      invariantKind: "departure",
      statement:
        "A figure taken after a first figure had been seen is reported as a rerun in its own output.",
    },
    {
      invariantKind: "departure",
      statement: "Strata are declared from category names and Alan's recorded rulings.",
    },
    {
      invariantKind: "absence",
      statement: "No stratum is declared from the agent's scores.",
    },
    {
      invariantKind: "departure",
      statement: "The agent is shown both the merchant title and the bank's own words.",
    },
    {
      invariantKind: "absence",
      statement: "A transaction's note is withheld.",
    },
    {
      invariantKind: "absence",
      statement:
        "Monarch's review flag is withheld as bookkeeping on this history rather than evidence of a purchase.",
    },
    {
      invariantKind: "absence",
      statement: "Uncategorized is not offered.",
    },
    {
      invariantKind: "departure",
      statement: "Confidence is the single channel for doubt.",
    },
    {
      invariantKind: "departure",
      statement: "The Monarch pages are marked before a run and again after.",
    },
    {
      invariantKind: "departure",
      statement: "Both marks land in the result file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is applied.",
    },
    {
      invariantKind: "absence",
      statement: "Monarch is not contacted at all.",
    },
    {
      invariantKind: "departure",
      statement: "A call's cost is read back off the call rather than derived from a rate card.",
    },
    {
      invariantKind: "absence",
      statement: "No rate card is kept here.",
    },
    {
      invariantKind: "departure",
      statement: "A run spends money and keeps its whole result.",
    },
    {
      invariantKind: "departure",
      statement: "Scoring reads that result.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing on a transaction records who set its category.",
    },
    {
      invariantKind: "gap",
      statement: "A row Monarch's own categorizer set reads identically to a row Jenny chose.",
    },
    {
      invariantKind: "departure",
      statement:
        "A split's category belongs to a part of the transaction rather than to the whole.",
    },
    {
      invariantKind: "gap",
      statement: "The transaction an agent is shown underdescribes the split categorized.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "A Bought Number Means Nothing",
      act: "Leave a fault in the agent unfixed where the fix writes this history's answers into the prompt.",
      warrant:
        "A score taken after the answer key was copied in describes this history rather than the next row.",
      aids: [
        "Repair the instrument where it is faulty and leave the subject alone.",
        "Say in the report which of the two a change was.",
        "Take a prompt decision on the development pool or not at all.",
      ],
    },
  ],
} as const satisfies Domain
