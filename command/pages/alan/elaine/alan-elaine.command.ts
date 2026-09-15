import type { Command } from "akasha/command/command.page-type.types.ts"

export const alanElaine = {
  id: "01a06809-250b-7e17-b028-ed7c9e003f14",
  type: "command",
  slug: "alan-elaine",
  definition: "the command reading what Apple Health recorded about Alan's body",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The archive is scanned whole on the macbook whatever window is asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The newest export zip in the machine's downloads is read where no path is said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The reading covers heart rate variability, resting heart rate, blood oxygen, steps and sleep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Heart rate variability is answered first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window shorter than one day is refused rather than read as the default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only records inside the window cross the wire.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The window reaches a day further back than the days asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path said here names a file on the macbook rather than a file under the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A macbook with no export is answered as missing data rather than as a wrong call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A macbook that could not be reached is answered apart from a macbook holding no export.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to the macbook.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the iPhone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying no window reaches fourteen days back.",
    },
  ],
  name: "elaine",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/days" },
    { argument: "argument/macbook-file" },
  ],
} as const satisfies Command
