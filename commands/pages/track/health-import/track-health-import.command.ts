import type { Command } from "../../../command.page-type.types.ts"

export const trackHealthImport = {
  id: "01a0620c-6340-70c9-a176-730aa9470e96",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-health-import",
  definition: "the command bringing an Apple Health export into the sample store",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--path <file>",
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
  helpNotes: [
    "the active energy and step count records the export holds are what lands in the sample store.",
    "the export is the newest `export*.zip` in `~/Downloads` unless `--path` names another.",
    "this workstation is looked in first and the macbook is reached over ssh only where this workstation holds no export.",
    "the phone writes that zip and nothing here makes the zip, so neither machine holding one refuses the call rather than waiting.",
    "records are filtered on the machine holding the export, so a call naming `--since` reads less than a call naming none.",
    "`--since` bounds the import below and nothing bounds the import above, so a day named far back brings in every record after that day.",
    "a call naming no `--since` brings in the whole history the export holds.",
    "a run that ends part way leaves a checkpoint keyed by the export, the day named and the metrics, and the next call takes that run up where the run ended.",
    "`--restart` begins at the head of the export whatever the checkpoint holds, and a newer export is a fresh run either way.",
    "a reading already filed at that value is written again by nothing, so a second call over one export writes nothing.",
    "nothing is said until the run ends, because a command prints nothing itself.",
    "the report counts records and names days and instants, and no reading's own value ever reaches the report.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "This call takes flags alone.",
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
} as const satisfies Command
