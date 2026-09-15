import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionAmend = {
  id: "01a07979-7f49-7026-ba5c-99f1601920f2",
  type: "page-type/command",
  slug: "track-session-amend",
  definition: "the command changing a stretch already written",
  code: "ts",
  test: "ts",
  parts: [],

  invariants: [
    {
      invariantKind: "invariant-kind/gap",
      statement: "An amend moves no stretch on either side of the stretch amended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `amend` replaces a stretch's relationships rather than adding to the stretch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`amend` reads `--at` as a time the stretch amended covers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by the id that stretch has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by a time that stretch covers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by being the open stretch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch is addressed by being the stretch that ended last.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No act here needs an id to address a stretch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--relationship` names a relationship by its id or by its title.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title no relationship has is refused rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title more than one relationship has is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relationship a title tags is kept beside one `--relationship` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An alias more than one relationship has tags neither and refuses nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act that sets a title reads that title for aliases.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `--dry-run` judges the change that would land and writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
  name: "amend",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/day" },
    { argument: "argument/at", oneOf: ["argument/id", "argument/open", "argument/last"] },
    { argument: "argument/id" },
    { argument: "argument/open" },
    { argument: "argument/last" },
    { argument: "argument/title" },
    { argument: "argument/safety" },
    { argument: "argument/difficulty" },
    { argument: "argument/relationship", repeats: true },
  ],
} as const satisfies Command
