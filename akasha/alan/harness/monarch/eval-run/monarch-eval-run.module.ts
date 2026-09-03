import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchEvalRun = {
  id: "01a06868-1535-7f9d-812e-7f071e571d5b",
  pageTypeSlug: "module",
  slug: "monarch-eval-run",
  definition: "one scored run of the agent over a drawn sample, kept as a file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The held-out pool is read once: a run over a file that already stands is refused unless it is said that a figure had already been seen.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run file's path is never defaulted to somewhere plausible, because the holdout guard reads a misplaced file as a set never seen.",
    },
    {
      invariantKind: "departure",
      statement:
        "The Monarch pages are marked before and after, so a run says whether anything moved under it.",
    },
    {
      invariantKind: "departure",
      statement: "Batches are asked four at a time rather than one by one or all at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "The whole run is kept — what was offered, what was drawn, what was proposed and what it cost — so it can be scored again without being run again.",
    },
    {
      invariantKind: "departure",
      statement: "A stratum that could not fill its draw says so as the run goes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Monarch or to our copy.",
    },
  ],
} as const satisfies Module
