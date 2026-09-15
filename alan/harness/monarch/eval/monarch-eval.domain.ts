import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const monarchEval = {
  id: "01a07740-d031-7503-a291-ce61a5f353a4",
  type: "page-type/domain",
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
      invariantKind: "invariant-kind/departure",
      statement:
        "The question is not whether an agent can categorize but where that agent can be trusted to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The question is whether an agent knows when that agent cannot be trusted to categorize.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An agent trusted past its reach spends Jenny's attention on corrections rather than on questions.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No single accuracy figure is reported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report delivered is the partition.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Coverage and reliability are reported together within each part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row a standing rule reaches is not this project's subject.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A row with no category anyone chose has no answer to be scored against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The rows with no category anyone chose are the rows this pipeline most exists to serve.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The held-out split is a hash of the transaction's own id rather than a stored shuffle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The prompt is built and revised against the development pool alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The held-out pool is read once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A second reading of the held-out pool is refused rather than trusted to anyone's memory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A figure taken after a first figure had been seen is reported as a rerun in its own output.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Strata are declared from category names and Alan's recorded rulings.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No stratum is declared from the agent's scores.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The agent is shown both the merchant title and the bank's own words.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A transaction's note is withheld.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Monarch's review flag is withheld as bookkeeping on this history rather than evidence of a purchase.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Uncategorized is not offered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Confidence is the single channel for doubt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Monarch pages are marked before a run and again after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both marks land in the result file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing is applied.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Monarch is not contacted at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call's cost is read back off the call rather than derived from a rate card.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rate card is kept here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run spends money and keeps its whole result.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Scoring reads that result.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing on a transaction records who set its category.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A row Monarch's own categorizer set reads identically to a row Jenny chose.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A split's category belongs to a part of the transaction rather than to the whole.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The transaction an agent is shown underdescribes the split categorized.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/principle",
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
