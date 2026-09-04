import type { Command } from "../command.page-type.ts"

export const elaine = {
  id: "01a06809-250b-7e17-b028-ed7c9e003f14",
  pageTypeSlug: "command",
  slug: "elaine",
  definition: "the command reading what Apple Health recorded about Alan's body",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "health-snapshot",
      takes: "the act, which is the latest reading of each metric beside its trailing trend",
    },
    { said: "--days <n>", takes: "how many days back the trailing window reaches" },
    {
      said: "--path <file>",
      takes: "the macbook path to an export zip or an unpacked export.xml, in place of the scan",
    },
    { said: "--json", takes: "the snapshot as one JSON object rather than as formatted lines" },
  ],
  helpNotes: [
    "the act stands first and one call names one act.",
    "Apple Health lives on the iPhone, so what is read is an export dropped on the macbook rather than the phone itself.",
    "the newest export zip standing in the macbook's downloads is taken where no path is named.",
    "the metrics are heart rate variability, resting heart rate, blood oxygen, steps and sleep.",
    "heart rate variability is the marquee reading and the others stand beneath it.",
    "refreshing means exporting again on the iPhone and dropping the zip on the macbook again.",
    "a window of no days is refused rather than read as the window this takes by default.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "The archive is scanned whole on the macbook whatever window is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "Only records inside the window cross the wire.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window reaches a day further back than the days asked for, so the oldest day asked for stands whole.",
    },
    {
      invariantKind: "departure",
      statement: "A path said here names a file on the macbook rather than one under the root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A macbook holding no export is answered as the data being missing rather than as the call being wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "A macbook that could not be reached is answered apart from one holding no export.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the macbook.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the iPhone.",
    },
  ],
} as const satisfies Command
