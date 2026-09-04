import type { Command } from "@akasha/command-system/command"

export const exerciseLogSet = {
  id: "01a0685c-7d81-7ca2-b8e5-868eace66ffc",
  pageTypeSlug: "command",
  slug: "exercise-log-set",
  definition: "the command writing down one set Alan performed in the session that is open",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<exercise>", takes: "the movement the set was of, named as the first word" },
    {
      said: "--exercise <ref>",
      takes: "the movement, named by id, by slug, by title or by part of one",
    },
    { said: "--reps <n>", takes: "how many repetitions were performed" },
    { said: "--weight <n>", takes: "the weight the set was performed at" },
    { said: "--rpe <n>", takes: "how hard the set felt, on the usual scale" },
    { said: "--note <text>", takes: "what the set felt like, or anything else worth keeping" },
    { said: "--note-file <file>", takes: "a file the note is read from" },
    { said: "--warmup", takes: "that the set was a warmup rather than working weight" },
    {
      said: "--session <ref>",
      takes: "the session to write into, which is the open one otherwise",
    },
    { said: "--set-number <n>", takes: "the number to give the set, rather than the next one" },
    { said: "--json", takes: "answer as JSON rather than as a line meant for a reader" },
  ],
  helpNotes: [
    "the movement is named as the first word or at `--exercise`, and either does the same thing.",
    "the session falls to the open one, and a session left open from an earlier day is refused rather than written to.",
    "the number a set gets is one past the highest already logged for that movement in that session.",
    "a warmup is logged like any other set and marked as one, so the last working set passes over it.",
    "a set is one page, so logging the same number twice writes over the first.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set is written into a session rather than standing on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A set is numbered against the movement it is of within the session.",
    },
    {
      invariantKind: "departure",
      statement: "The first set of a movement in a session is set one.",
    },
    {
      invariantKind: "departure",
      statement: "A set carries reps.",
    },
    {
      invariantKind: "departure",
      statement: "A set's weight and effort may be left out.",
    },
  ],
} as const satisfies Command
