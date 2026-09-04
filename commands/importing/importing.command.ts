import type { Command } from "../../command-system/commands/command.page-type.ts"

export const importing = {
  id: "01a0620c-6340-70c9-a176-730aa9470e96",
  pageTypeSlug: "command",
  slug: "importing",
  definition: "the command bringing a named subject in from outside",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<subject>", takes: "what is brought in, which is `health`" },
    {
      said: "--path <file>",
      takes: "the export on the macbook to read, in place of the newest export there",
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
    "the subject comes first, and one call brings in one subject.",
    "`health` reads an Apple Health export on the macbook over ssh and lands the active energy and step count records the export holds in the sample store.",
    "the export is the newest `export*.zip` in the Mac's `~/Downloads` unless `--path` names another.",
    "the phone writes that zip and nothing here makes the zip, so a Mac holding none refuses the call rather than waiting.",
    "records are filtered on the macbook, so a call naming `--since` moves less over the wire than a call naming none.",
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
      statement: "An import brings in one subject.",
    },
    {
      invariantKind: "departure",
      statement: "The subject comes first and what bounds the import comes after the subject.",
    },
    {
      invariantKind: "departure",
      statement: "A subject nothing here brings in is refused rather than chosen for.",
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
      statement: "A restart begins at the head of the export whatever a checkpoint holds.",
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
      statement: "An export the macbook does not hold refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "No reading's own value reaches the report.",
    },
    {
      invariantKind: "gap",
      statement: "Whether the export on the macbook is current is answered by nothing here.",
    },
  ],
} as const satisfies Command
