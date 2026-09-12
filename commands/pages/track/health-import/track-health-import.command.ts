import type { Command } from "akasha/commands/command.page-type.types.ts"

export const trackHealthImport = {
  id: "01a0620c-6340-70c9-a176-730aa9470e96",
  type: "command",
  slug: "track-health-import",
  definition: "the command bringing an Apple Health export into the sample store",
  code: "ts",
  test: "ts",
  taking: [
    {
      said: "--file-path <path>",
      takes: "the export to read, in place of the newest export the machine holds",
    },
    { said: "--since <YYYY-MM-DD>", takes: "the first civil day to bring in" },
    { said: "--batch <n>", takes: "how many readings one write carries, 1 to 1000" },
    { said: "--dry-run", takes: "read and count and write nothing" },
    {
      said: "--restart",
      takes: "begin at the head of the export rather than where an earlier run ended",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "This call takes flags alone.",
    },
    {
      invariantKind: "departure",
      statement: "Active energy and step count are the records that land in the sample store.",
    },
    {
      invariantKind: "departure",
      statement: "The export read is the newest `export*.zip` in `~/Downloads`.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no `--since` brings in the whole history the export holds.",
    },
    {
      invariantKind: "departure",
      statement: "A checkpoint is keyed by the export, the day named and the metrics.",
    },
    {
      invariantKind: "departure",
      statement: "A reading already filed at that value is written again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reads and counts and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A run taken up again begins where the earlier run ended.",
    },
    {
      invariantKind: "departure",
      statement: "A restart begins at the head of the export whatever a checkpoint has.",
    },
    {
      invariantKind: "departure",
      statement: "A day named bounds the import below and nothing bounds the import above.",
    },
    {
      invariantKind: "departure",
      statement: "An import that ends part way keeps the readings already written.",
    },
    {
      invariantKind: "departure",
      statement: "This workstation is looked in before the macbook is reached.",
    },
    {
      invariantKind: "departure",
      statement: "An export neither machine has refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "No reading's own value reaches the report.",
    },
    {
      invariantKind: "gap",
      statement: "Whether the export read is current is answered by nothing here.",
    },
  ],
  name: "health-import",
} as const satisfies Command
