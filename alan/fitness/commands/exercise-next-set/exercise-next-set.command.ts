import type { Command } from "@akasha/command-system/command"

export const exerciseNextSet = {
  id: "01a0685d-b7ab-7c3e-8164-fabcaa2197eb",
  pageTypeSlug: "command",
  slug: "exercise-next-set",
  definition: "the command naming the one set to perform next in the session that stands open",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--session <ref>",
      takes: "the session planned against, named by id, by title or by part of either",
    },
    {
      said: "--focus <focus>",
      takes: "the focus planned against, today's scheduled focus where none is said",
    },
    {
      said: "--skip <ref>",
      takes: "a movement left out of the day, said once for each movement left out",
    },
    { said: "--json", takes: "give the set as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the plan is re-derived on every call from what the open session already holds, so the session's length and shape stay open.",
    "a movement skipped before it was worked leaves the pool and the plan re-derives around it.",
    "a movement skipped after it was worked ends that slot for the day, with nothing put in its place.",
    "a set at RIR one or under, or one whose reps fell under the target floor, ends that movement for the day.",
    "a session with nothing left answers as done rather than refusing.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The plan is re-derived from the session's own sets on every call.",
    },
    {
      invariantKind: "departure",
      statement: "A movement skipped before it was worked leaves the pool the plan is drawn from.",
    },
    {
      invariantKind: "departure",
      statement: "A movement skipped after it was worked ends its slot with nothing in its place.",
    },
    {
      invariantKind: "departure",
      statement: "A warmup set counts toward nothing the plan is derived from.",
    },
    {
      invariantKind: "departure",
      statement: "A session with nothing left is answered as done rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A rep range of nothing to nothing is time-based work.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slot with no load prescribed says to pick one that holds the range at the RIR target.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here logs the set it names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers the whole plan; that is what exercise-select is for.",
    },
  ],
} as const satisfies Command
