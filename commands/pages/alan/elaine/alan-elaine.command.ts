import type { Command } from "akasha/commands/command.page-type.types.ts"

export const alanElaine = {
  id: "01a06809-250b-7e17-b028-ed7c9e003f14",
  type: "command",
  slug: "alan-elaine",
  definition: "the command reading what Apple Health recorded about Alan's body",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--days <n>",
      takes: "how many days back the trailing window reaches, fourteen where none is said",
    },
    {
      said: "--path <file>",
      takes: "the macbook path to an export zip or an unpacked export.xml, in place of the scan",
    },
    { said: "--json", takes: "the snapshot as one JSON object rather than as formatted lines" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The archive is scanned whole on the macbook whatever window is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The newest export zip in the machine's downloads is read where no path is said.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading covers heart rate variability, resting heart rate, blood oxygen, steps and sleep.",
    },
    {
      invariantKind: "departure",
      statement: "Heart rate variability is answered first.",
    },
    {
      invariantKind: "departure",
      statement: "A window shorter than one day is refused rather than read as the default.",
    },
    {
      invariantKind: "departure",
      statement: "Only records inside the window cross the wire.",
    },
    {
      invariantKind: "departure",
      statement: "The window reaches a day further back than the days asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A path said here names a file on the macbook rather than a file under the root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A macbook with no export is answered as missing data rather than as a wrong call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A macbook that could not be reached is answered apart from a macbook holding no export.",
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
  name: "elaine",
} as const satisfies Command
