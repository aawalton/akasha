import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workstationLoadSampling = {
  id: "01a0a069-f901-796d-ab48-ba63c80717ec",
  type: "module",
  slug: "workstation-load-sampling",
  definition:
    "the workstation's processor and memory readings, taken on a beat and kept beside their readouts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sample is taken every five seconds from the kernel's own counters.",
    },
    {
      invariantKind: "departure",
      statement:
        "The processor reading is the share busy between one sample and the sample before.",
    },
    {
      invariantKind: "departure",
      statement:
        "The first sample answers no processor reading, since a share needs a sample before it.",
    },
    {
      invariantKind: "departure",
      statement: "The memory reading is read whole off one sample.",
    },
    {
      invariantKind: "departure",
      statement: "The processor share is kept as a whole percent.",
    },
    {
      invariantKind: "departure",
      statement: "The memory reading is kept in the gigabytes its own readout answers.",
    },
    {
      invariantKind: "departure",
      statement: "A sample finding the reading the sample before found writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is kept beside the readout that reading was taken for.",
    },
    {
      invariantKind: "departure",
      statement: "A sample finding no reading keeps what the readout already holds.",
    },
    {
      invariantKind: "departure",
      statement: "Every twelfth sample writes the moment beside the sampler's own service page.",
    },
    {
      invariantKind: "departure",
      statement: "That moment is where the sampler leaves for code that moved.",
    },
    {
      invariantKind: "departure",
      statement: "A sample that throws ends the run rather than being caught and logged.",
    },
    {
      invariantKind: "departure",
      statement: "Where every page named here sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a child process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here carries a reading to a site.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a share into a color.",
    },
  ],
} as const satisfies Module
