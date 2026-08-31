import type { Command } from "../command.page-type.ts"

export const refactor = {
  id: "01a0587b-6773-713a-8932-42c28462e9d0",
  pageTypeSlug: "command",
  slug: "refactor",
  definition: "a name the pages are spelled by changed everywhere it is spelled, as one act",
  code: "ts",
  test: "ts",
  mechanical: true,
  partSlugs: ["module/key-respelling", "module/type-renaming", "module/type-respelling"],
  taking: [
    { said: "rename page-type", takes: "the act, and the namespace it is worked over" },
    { said: "rename property-slug", takes: "the act, and the namespace it is worked over" },
    { said: "--from <name>", takes: "the page type's slug, or the address a property stands at" },
    { said: "--to <slug>", takes: "the slug it becomes, or the key the property is read by" },
    { said: "--plural <slug>", takes: "the plural it becomes, on a page type rename alone" },
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
    "a spelling it cannot judge to be a path is named in the answer rather than changed.",
    "a property is named by the address it stands at, since a key on its own reaches no property.",
    "a key rename carries no file, so it takes no plural and repoints no address.",
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
      statement: "The slug `page-type` is not renamed here.",
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
      invariantKind: "departure",
      statement: "A path naming the renamed type is repointed wherever a body spells it.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling standing between no path marks is named rather than changed.",
    },
    {
      invariantKind: "departure",
      statement: "An answer names every place still naming what was renamed.",
    },
    {
      invariantKind: "departure",
      statement: "Each namespace takes the flags its own rename needs and refuses the rest.",
    },
    {
      invariantKind: "departure",
      statement: "Every place the checker resolves to a renamed key is respelled in one commit.",
    },
    {
      invariantKind: "absence",
      statement: "A module named for a renamed page type is not renamed with it.",
    },
  ],
} as const satisfies Command
