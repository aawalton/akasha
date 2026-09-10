import type { Command } from "../../../../command.page-type.types.ts"

export const trackSessionSplit = {
  id: "01a07979-7fe5-72fa-8982-e069a28c90c2",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-session-split",
  definition: "the command parting one stretch into two at a time said",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--at <time>", takes: "the wall time the stretch is parted at" },
    { said: "--id <uuid>", takes: "the stretch to act on, named by the id that stretch carries" },
    { said: "--open", takes: "the stretch to act on, which is the one that is open" },
    { said: "--last", takes: "the stretch to act on, which is the one that ended last" },
    { said: "--title <text>", takes: "what the second half is called" },
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    {
      said: "--safety <level>",
      takes: "how safe Alan was over the stretch, from -2 to 5 in half steps",
    },
    {
      said: "--difficulty <level>",
      takes: "how hard the stretch was on him, from 0 to 5 in half steps",
    },
    {
      said: "--relationship <id|title>",
      takes: "who the stretch was with, said again or parted by commas for several",
    },
    { said: "--dry-run", takes: "judge what the act would land and write nothing" },
  ],
  helpNotes: [
    "every time said here is a US Mountain wall time, and no other clock is read or written.",
    "a day is named at --day and nowhere else.",
    "a stretch is addressed by --id, by --at, by --open or by --last, so no act asks for an id first.",
    "show prints each stretch's id in what it says to a reader, which is where an id to address by comes from.",
    "the time --at names is the time the stretch is parted at, and a stretch named by no other flag is the one that time covers.",
    "--relationship names a relationship by its id or by its title.",
    "a title carrying one of a relationship's aliases tags the stretch with that relationship, with no flag said, and what --relationship names is kept beside it.",
    "an alias more than one relationship carries tags neither, and says nothing about it, since no act that writes stops to ask.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `split` parts one stretch into two stretches at the time said.",
    },
    {
      invariantKind: "departure",
      statement: "`split` reads `--at` as the time the stretch is parted at.",
    },
    {
      invariantKind: "departure",
      statement: "A time falling outside the stretch parted is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Both halves a `split` makes have the relationships of the stretch parted.",
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
      statement: "`--relationship` names a relationship by its id or by its title.",
    },
    {
      invariantKind: "departure",
      statement: "A title no relationship has is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A title more than one relationship has is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A relationship a title tags is kept beside one `--relationship` names.",
    },
    {
      invariantKind: "departure",
      statement: "An alias more than one relationship has tags neither and refuses nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An act that sets a title reads that title for aliases.",
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
