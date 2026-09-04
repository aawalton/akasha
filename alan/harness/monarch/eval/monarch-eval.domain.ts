import type { Domain } from "../../../../domains/domains/domain.page-type.ts"

export const monarchEval = {
  id: "01a0686a-c033-fae1-cb98-55decd42b2c4",
  pageTypeSlug: "domain",
  slug: "monarch-eval",
  definition:
    "how far an agent can be trusted to settle a transaction's category, and where it cannot",
  partSlugs: [
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
        "The question is not whether an agent can categorize but where it can be trusted to, and whether it knows when it cannot.",
    },
    {
      invariantKind: "departure",
      statement:
        "An agent trusted where it should not be spends Jenny's attention on corrections rather than on questions, which is worse than never having asked her.",
    },
    {
      invariantKind: "absence",
      statement:
        "No single accuracy figure is reported, because one rate over everything is equally consistent with an agent flawless on half the history and hopeless on the other and with one mediocre everywhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is delivered is the partition, and within each part coverage and reliability together.",
    },
    {
      invariantKind: "departure",
      statement: "A row a standing rule reaches is not this project's subject.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row carrying no category anyone chose has no answer to be scored against, and those are the rows this pipeline most exists to serve.",
    },
    {
      invariantKind: "departure",
      statement:
        "The held-out split is a hash of the transaction's own id rather than a stored shuffle, because a stored shuffle can be redrawn after a disappointing result with nothing showing it was redrawn.",
    },
    {
      invariantKind: "departure",
      statement: "The prompt is built and revised against the development pool alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "The held-out pool is read once, and a second reading is refused rather than trusted to anyone's memory.",
    },
    {
      invariantKind: "departure",
      statement:
        "A figure taken after a first one had been seen is reported as a rerun in its own output, so it cannot be quoted as though it were clean.",
    },
    {
      invariantKind: "departure",
      statement:
        "The strata are declared from the category names and from Alan's recorded rulings, never from how the agent scores, because a stratum drawn after seeing results is a description of the results.",
    },
    {
      invariantKind: "departure",
      statement:
        "The agent is shown both the merchant title and the bank's own words, because each destroys signal the other keeps.",
    },
    {
      invariantKind: "absence",
      statement:
        "A transaction's note is withheld, because a note is written at or after the moment of categorizing and so belongs to the answer rather than to the question, and a transaction arriving tomorrow carries none.",
    },
    {
      invariantKind: "absence",
      statement:
        "Monarch's own review flag is withheld, being bookkeeping about this history rather than evidence about a purchase.",
    },
    {
      invariantKind: "absence",
      statement:
        "Uncategorized is not offered, because it splits declining across a confidence level and a category choice, and neither figure then means what it says.",
    },
    {
      invariantKind: "departure",
      statement: "Confidence is the single channel for doubt.",
    },
    {
      invariantKind: "departure",
      statement:
        "The Monarch pages are marked before a run and again after, and both marks land in the result file, because a claim that nothing moved and a run that never checked read identically.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing is applied: no page is written, no category is set, and Monarch is not contacted at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a call cost is read back off the call rather than derived from a rate card this repo would have to keep current.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run spends money and keeps its whole result, and scoring reads that result, so a report can be redrawn any number of ways without paying again.",
    },
    {
      invariantKind: "gap",
      statement:
        "Nothing on a transaction records who set its category, so a row Monarch's own categorizer set reads identically to one Jenny chose.",
    },
    {
      invariantKind: "gap",
      statement:
        "A split's category belongs to a part of the transaction rather than to the whole, so what the agent is shown underdescribes what was categorized.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Never Buy A Number With Its Meaning",
      act: "Leave a fault in the agent unfixed where the fix would write this history's own answers into the prompt.",
      warrant:
        "The fix is always available and always raises the number, and a score taken after the answer key was copied in describes this history rather than the next transaction.",
      aids: [
        "Repair the instrument where it is faulty and leave the subject alone.",
        "Say in the report which of the two a change was.",
        "A prompt decision taken after seeing scores is the failure this work is most exposed to; make it on the development pool or not at all.",
      ],
    },
  ],
} as const satisfies Domain
