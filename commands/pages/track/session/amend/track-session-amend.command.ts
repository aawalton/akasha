import type { Command } from "../../../../command.page-type.ts"

export const trackSessionAmend = {
  id: "01a07979-7f49-7026-ba5c-99f1601920f2",
  pageTypeSlug: "command",
  slug: "track-session-amend",
  definition: "the command changing a stretch already written",
  code: "ts",
  changeKind: "change-mechanical",
  partSlugs: ["module/session-leveling"],
  taking: [
    { said: "--id <uuid>", takes: "the stretch to act on, named by the id that stretch carries" },
    { said: "--at <time>", takes: "a wall time the stretch amended covers" },
    { said: "--open", takes: "the stretch to act on, which is the one that is open" },
    { said: "--last", takes: "the stretch to act on, which is the one that ended last" },
    { said: "--title <text>", takes: "what the stretch is called" },
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
    "--relationship names a relationship by its id or by its title, and amend replaces what a stretch carried rather than adding to it.",
    "a title carrying one of a relationship's aliases tags the stretch with that relationship, with no flag said, and what --relationship names is kept beside it.",
    "an alias more than one relationship carries tags neither, and says nothing about it, since no act that writes stops to ask.",
  ],
  invariants: [
    {
      invariantKind: "gap",
      statement: "An amend moves no stretch on either side of the stretch amended.",
    },
    {
      invariantKind: "departure",
      statement: "An `amend` replaces a stretch's relationships rather than adding to the stretch.",
    },
    {
      invariantKind: "departure",
      statement: "`amend` reads `--at` as a time the stretch amended covers.",
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
