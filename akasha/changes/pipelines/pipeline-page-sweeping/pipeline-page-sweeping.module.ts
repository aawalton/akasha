import type { Module } from "@akasha/code-system/module"

export const pipelinePageSweeping = {
  id: "01a0686a-7a57-788e-b5ce-ffc4967c2ecc",
  pageTypeSlug: "module",
  slug: "pipeline-page-sweeping",
  definition: "every unsettled pipeline, workflow and step page moved to what it owes next",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One workstation process serves every pipeline rather than one standing per pipeline.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick passes again until a pass writes nothing, so a step reaching its verdict carries its workflow and its pipeline in the same tick.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pending pipeline holding workflows starts dispatching, and one on main waits behind an older pipeline already underway.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pending workflow whose dependencies passed starts dispatching, and one whose dependency failed is blocked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pending step whose dependencies have settled and whose gate is met is dispatched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parent's verdict rolls up from its children, and answering, overtaking or cancelling a parent carries to its children.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step at launching whose container has started goes to running beside the moment it started.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step at running whose container has exited goes to passed or failed beside the exit code and what killed it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing reports a step back, and nothing here listens.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cluster read that fails moves no step off launching or running that tick, and every other move still lands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline's and a workflow's status stands in its page, so a move there is a commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step's whole state stands in the gitignored sidecar beside its page, so nothing written about a step is committed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every write is guarded on the status it was decided from, read again immediately before the write.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working when its ceiling passes ends the process rather than letting a second one start beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The loop runs until it is asked to stop, and a stop ends it at the next boundary.",
    },
  ],
} as const satisfies Module
