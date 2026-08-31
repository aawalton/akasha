import type { Command } from "../command.page-type.ts"

export const refactor = {
  id: "01a0587b-6773-713a-8932-42c28462e9d0",
  pageTypeSlug: "command",
  slug: "refactor",
  definition: "a name the corpus is spelled by changed everywhere it is spelled, as one act",
  code: "ts",
  test: "ts",
  mechanical: true,
  partSlugs: ["module/type-renaming"],
  taking: [
    { said: "rename page-type", takes: "the act, and the namespace it is worked over" },
    { said: "--from <slug>", takes: "the slug a page type carries now" },
    { said: "--to <slug>", takes: "the slug it becomes" },
    { said: "--plural <slug>", takes: "the plural it becomes" },
    { said: "--dry-run", takes: "say what would happen and write nothing" },
  ],
  helpNotes: [
    "the act and the namespace stand before the flags, so more of each can be taken later.",
    "a plural is stated rather than worked out, so it is asked for rather than guessed.",
    "`page-type` itself is refused, being the tail every page type's own file carries.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act names the namespace it is worked over.",
    },
    {
      invariantKind: "departure",
      statement: "An act this does not carry is refused with the ones it does.",
    },
    {
      invariantKind: "departure",
      statement: "What a rename would touch is answered before it is asked to land.",
    },
    {
      invariantKind: "gap",
      statement: "A rename lands the change it plans.",
    },
  ],
} as const satisfies Command
