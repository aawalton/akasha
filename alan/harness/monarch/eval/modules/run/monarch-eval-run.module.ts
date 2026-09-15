import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchEvalRun = {
  id: "01a06868-1535-7f9d-812e-7f071e571d5b",
  type: "module",
  slug: "monarch-eval-run",
  definition: "one scored run of the agent over a drawn sample, kept as a file",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run over a file that is already there is refused unless a figure is said to have been seen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run file's path is never defaulted to somewhere plausible.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The Monarch pages are marked before and after a run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run says whether anything moved under that run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Batches are asked four at a time rather than one by one or every batch at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The categories offered and the rows drawn and the proposals and the cost are all kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stratum that could not fill its draw says so as the run goes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to Monarch or to our copy.",
    },
  ],
} as const satisfies Module
