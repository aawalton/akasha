import type { Command } from "@akasha/command-system/command"

export const pipelineBenchmark = {
  id: "01a06810-9439-75ee-816c-8afa1bd8baa4",
  pageTypeSlug: "command",
  slug: "pipeline-benchmark",
  definition: "the command measuring one CI node by a pinned job running the whole check registry",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--node <name>", takes: "the node to pin the job to, node-06 where none is said" },
    {
      said: "--store <disk|memory>",
      takes: "the one store variant to run, both where none is said",
    },
    {
      said: "--sha <sha>",
      takes: "the commit to measure, the head of origin/main where none is said",
    },
    {
      said: "--timeout-min <n>",
      takes: "the minutes one variant's job is waited on, forty-five by default",
    },
    { said: "--json", takes: "give the merged report as JSON rather than as text" },
  ],
  helpNotes: [
    "the job runs the real preparation and the real check registry on a cold store local to the pod.",
    "three metric families are captured: the per-phase timings with a smoke verdict, the memory-against-disk store delta, and the OutOfcpu burst rate.",
    "the burst rate is both the cluster events observed over the run and a synthetic sweep of capacity margins.",
    "both store variants run unless one is named, so a baseline run fills every family.",
    "the smoke verdict is a field of the report rather than a gate on the run.",
    "a variant that emitted no report is a measurement gap, and which variants went unmeasured is said.",
    "a red beyond the declared environmental set invalidates the run, which then says nothing until that red is understood.",
    "the buildkit-on-node-06 caveat is stamped into every report.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The job is pinned to one node and runs on a store cold and local to its pod.",
    },
    {
      invariantKind: "departure",
      statement: "The check registry the job runs is the real one rather than a sample of it.",
    },
    {
      invariantKind: "departure",
      statement: "Both store variants run unless one is named.",
    },
    {
      invariantKind: "departure",
      statement: "The variants run one after another rather than together.",
    },
    {
      invariantKind: "departure",
      statement: "The smoke verdict is a field of the report rather than a gate on the run.",
    },
    {
      invariantKind: "departure",
      statement: "A variant emitting no report is a measurement gap rather than a failed run.",
    },
    {
      invariantKind: "departure",
      statement: "Which variants went unmeasured is named in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A red beyond the declared environmental set invalidates the whole run.",
    },
    {
      invariantKind: "departure",
      statement: "The observed burst count going unread is a field rather than a failure.",
    },
    {
      invariantKind: "departure",
      statement: "A name no node of this cluster carries is the caller's mistake.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a pipeline page.",
    },
  ],
} as const satisfies Command
