import type { Command } from "@akasha/command-system/command"

export const exerciseLogActivity = {
  id: "01a0685c-7d81-75b0-a1e4-58ac04db66f1",
  pageTypeSlug: "command",
  slug: "exercise-log-activity",
  definition:
    "the command writing down one stretch of cardio or mobility, timed rather than repped",
  code: "ts",
  changeKindSlug: "change-checked",
  taking: [
    { said: "<exercise>", takes: "the movement the stretch was of, named as the first word" },
    {
      said: "--exercise <ref>",
      takes: "the movement, named by id, by slug, by title or by part of one",
    },
    { said: "--type <cardio|mobility>", takes: "which of the two sorts of activity it was" },
    { said: "--duration <min>", takes: "how long it ran, said in minutes" },
    { said: "--hold <sec>", takes: "how long a mobility position was held, said in seconds" },
    { said: "--distance <miles>", takes: "how far it covered, said in miles" },
    { said: "--note <text>", takes: "what the stretch felt like, or anything else worth keeping" },
    { said: "--note-file <file>", takes: "a file the note is read from" },
    {
      said: "--session <ref>",
      takes: "the session to write into, which is the open one otherwise",
    },
    { said: "--set-number <n>", takes: "the number to give the stretch, rather than the next one" },
    { said: "--json", takes: "answer as JSON rather than as a line meant for a reader" },
  ],
  helpNotes: [
    "this is the sibling of `exercise-log-set` for work that is timed rather than repped.",
    "`--duration` is minutes and `--hold` is seconds, both land as seconds, and one call says at most one of them.",
    "the session falls to the open one, and a session left open from an earlier day is refused rather than written to.",
    "the number a stretch gets is one past the highest already logged for that movement in that session.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stretch of cardio or mobility is written down as a set that carries no reps.",
    },
    {
      invariantKind: "departure",
      statement: "How long a stretch ran is kept in seconds however it was said.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying both a duration and a hold is refused.",
    },
  ],
} as const satisfies Command
