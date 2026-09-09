import type { Module } from "@akasha/code/module"

export const checkCost = {
  id: "01a06dc1-5cd3-7e3e-b1c7-133ae3f5ec38",
  pageTypeSlug: "module",
  slug: "check-cost",
  definition: "what one run cost, appended beside the page of what ran",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cost is taken around one run rather than around every run one call makes.",
    },
    {
      invariantKind: "departure",
      statement: "A line states the run a cost was taken in.",
    },
    {
      invariantKind: "departure",
      statement: "A line states what ran.",
    },
    {
      invariantKind: "departure",
      statement: "The paths counted are the change's own rather than the paths the check judged.",
    },
    {
      invariantKind: "departure",
      statement: "A run is timed by the processor rather than by the clock alone.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds a reaped child burned are read from `/proc/self/stat`.",
    },
    {
      invariantKind: "departure",
      statement: "The high-water mark is forgotten before a run.",
    },
    {
      invariantKind: "departure",
      statement: "The mark after a run is that run's own peak.",
    },
    {
      invariantKind: "departure",
      statement: "A peak read from a mark no run forgot measures the record rather than the run.",
    },
    {
      invariantKind: "departure",
      statement: "A line states whether the mark was forgotten.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy is never read as a measurement.",
    },
    {
      invariantKind: "departure",
      statement:
        "The memory a run added is that run's peak over the memory resident when the run opened.",
    },
    {
      invariantKind: "departure",
      statement: "A run states how many reads and writes it made and how many bytes it read.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those counts are read from `/proc/self/io` as the seconds are read from `/proc/self/stat`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bytes counted are the bytes a run asked for rather than the bytes a disk fetched.",
    },
    {
      invariantKind: "departure",
      statement: "A line is appended to the last numbered file rather than rewriting that file.",
    },
    {
      invariantKind: "departure",
      statement: "A line rolls into the next numbered file where the ceiling is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A file's fill is read from its size rather than from its text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a run for that run's cost.",
    },
    {
      invariantKind: "departure",
      statement: "Closing a cost, minting its run id and appending its line are one call.",
    },
    {
      invariantKind: "absence",
      statement:
        "A disk that refuses a line for a page that is there leaves the run's answer alone.",
    },
    {
      invariantKind: "departure",
      statement: "A line for a path naming no page refuses the run rather than being dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The two are told apart by whether the page named is there.",
    },
    {
      invariantKind: "gap",
      statement: "The peak memory a reaped child reached is read nowhere here.",
    },
    {
      invariantKind: "gap",
      statement: "A run's peak has the memory earlier runs left resident.",
    },
    {
      invariantKind: "gap",
      statement: "A peak a run within forgot is no peak of the run around that run.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here has a lock against another writer of the same file.",
    },
  ],
} as const satisfies Module
