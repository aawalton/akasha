import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackSessionAmend = {
  id: "01a07979-7f49-7026-ba5c-99f1601920f2",
  type: "page-type/command",
  slug: "track-session-amend",
  definition: "the command changing a stretch already written",
  code: "ts",
  test: "ts",
  parts: [],

  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "An amend moves no stretch on either side of the stretch amended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `amend` replaces a stretch's relationships rather than adding to the stretch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`amend` reads `--at` as a time the stretch amended covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by the id that stretch has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by a time that stretch covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by being the open stretch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch is addressed by being the stretch that ended last.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No act here needs an id to address a stretch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wall time this command takes or says is a US Mountain time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--relationship` names a relationship by its id or by its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title no relationship has is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title more than one relationship has is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship a title tags is kept beside one `--relationship` names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An alias more than one relationship has tags neither and refuses nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An act that sets a title reads that title for aliases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write here is judged as `check` judges.",
    },
  ],
  name: "amend",
  arguments: [
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
