import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workstationLoadSampling = {
  id: "01a0a069-f901-796d-ab48-ba63c80717ec",
  type: "page-type/module",
  slug: "workstation-load-sampling",
  definition:
    "the workstation's processor and memory readings, taken on a beat and kept beside their readouts",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample is taken every five seconds from the kernel's own counters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readouts sampled are those whose pages name this module as serving them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each readout's own reading code hands out the sampler reading its counters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout whose reading code hands out no sampler ends the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample finding the reading the sample before found writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is kept beside the readout that reading was taken for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample finding no reading keeps what the readout already holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every twelfth sample writes the moment beside the sampler's own service page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That moment is where the sampler leaves for code that moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sample that throws ends the run rather than being caught and logged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where every page named here sits is asked of the index rather than spelled.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a child process.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here carries a reading to a site.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a share into a color.",
    },
  ],
} as const satisfies Module
