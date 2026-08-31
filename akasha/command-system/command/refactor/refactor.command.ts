import type { Command } from "../command.page-type.ts"

export const refactor = {
  id: "01a0587b-6773-713a-8932-42c28462e9d0",
  pageTypeSlug: "command",
  slug: "refactor",
  definition: "a name the corpus is spelled by changed everywhere it is spelled, as one act",
  code: "ts",
  test: "ts",
  mechanical: true,
  partSlugs: ["module/type-renaming", "module/type-respelling"],
  taking: [
    { said: "rename page-type", takes: "the act, and the namespace it is worked over" },
    { said: "--from <slug>", takes: "the slug a page type carries now" },
    { said: "--to <slug>", takes: "the slug it becomes" },
    { said: "--plural <slug>", takes: "the plural it becomes" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
    { said: "--dry-run", takes: "say what would happen and write nothing" },
  ],
  helpNotes: [
    "the act and the namespace stand before the flags, so more of each can be taken later.",
    "a plural is stated rather than worked out, so it is asked for rather than guessed.",
    "`page-type` itself is refused, being the tail every page type's own file carries.",
    "--dry-run names every file it would carry; a landing says how many.",
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
      invariantKind: "departure",
      statement: "Every file a rename touches lands in one commit or none of them does.",
    },
    {
      invariantKind: "departure",
      statement: "Every page of the renamed type states the slug it becomes.",
    },
    {
      invariantKind: "departure",
      statement: "Every address naming the type or a page of it is repointed in the same commit.",
    },
    {
      invariantKind: "departure",
      statement: "Every file importing what moved is repointed in the same commit.",
    },
    {
      invariantKind: "departure",
      statement: "The type a page type declares is renamed with it.",
    },
    {
      invariantKind: "departure",
      statement: "The name a page type's value is imported under is renamed with it.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies a rename carries are read from the commit it stood on.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding uncommitted values is carried rather than rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of what a rename carries is carried with it.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` names every file it would carry.",
    },
    {
      invariantKind: "departure",
      statement: "A landing says how many files were carried rather than naming each.",
    },
    {
      invariantKind: "gap",
      statement: "A rename leaves nothing in the corpus naming what it renamed.",
    },
    {
      invariantKind: "gap",
      statement: "The modules named for a renamed page type are renamed with it.",
    },
  ],
} as const satisfies Command
