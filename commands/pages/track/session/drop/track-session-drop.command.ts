import type { Command } from "../../../../command.page-type.types.ts"

export const trackSessionDrop = {
  id: "01a07979-7f97-7091-a9d1-44c424ec745c",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-session-drop",
  definition: "the command taking a stretch away from a day",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--id <uuid>", takes: "the stretch to act on, named by the id that stretch carries" },
    { said: "--at <time>", takes: "a wall time the stretch dropped covers" },
    { said: "--open", takes: "the stretch to act on, which is the one that is open" },
    { said: "--last", takes: "the stretch to act on, which is the one that ended last" },
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    { said: "--mend", takes: "close the gap a dropped stretch leaves behind" },
    { said: "--dry-run", takes: "judge what the act would land and write nothing" },
  ],
  helpNotes: [
    "every time said here is a US Mountain wall time, and no other clock is read or written.",
    "a day is named at --day and nowhere else.",
    "a stretch is addressed by --id, by --at, by --open or by --last, so no act asks for an id first.",
    "show prints each stretch's id in what it says to a reader, which is where an id to address by comes from.",
    "drop leaves the gap it makes behind unless --mend is said.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A drop leaves the gap behind.",
    },
    {
      invariantKind: "departure",
      statement: "`--mend` closes that gap.",
    },
    {
      invariantKind: "departure",
      statement: "`drop` reads `--at` as a time the stretch dropped covers.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by the id that stretch has.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by a time that stretch covers.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by being the open stretch.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is addressed by being the stretch that ended last.",
    },
    {
      invariantKind: "absence",
      statement: "No act here needs an id to address a stretch.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      invariantKind: "departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "departure",
      statement: "A `--dry-run` judges the change that would land and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
} as const satisfies Command
