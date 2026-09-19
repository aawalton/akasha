import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackHealthImport = {
  id: "01a0620c-6340-70c9-a176-730aa9470e96",
  type: "page-type/command",
  slug: "track-health-import",
  definition: "the command bringing an Apple Health export into the sample store",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This call takes flags alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Active energy and step count are the records that land in the sample store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The export read is the newest `export*.zip` in `~/Downloads`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no `--since` brings in the whole history the export holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkpoint is keyed by the export, the day named and the metrics.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading already filed at that value is written again by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run taken up again begins where the earlier run ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart begins at the head of the export whatever a checkpoint has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day named bounds the import below and nothing bounds the import above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import that ends part way keeps the readings already written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import that broke after a batch landed names each batch it wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says the run can be taken up unless that run wrote nothing at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An export read with no header line names the batches it wrote before refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This workstation is looked in before the macbook is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An export neither machine has refuses the call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No reading's own value reaches the report.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Whether the export read is current is answered by nothing here.",
    },
  ],
  name: "health-import",
  arguments: [
    { argument: "argument/health-export-path" },
    { argument: "argument/batch" },
    { argument: "argument/restart" },
    { argument: "argument/first-day" },
  ],
} as const satisfies Command
