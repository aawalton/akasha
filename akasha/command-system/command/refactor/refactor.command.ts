import type { Command } from "../command.page-type.ts"

export const refactor = {
  id: "01a0587b-6773-713a-8932-42c28462e9d0",
  pageTypeSlug: "command",
  slug: "refactor",
  definition: "a name the pages are spelled by changed everywhere it is spelled, as one act",
  code: "ts",
  test: "ts",
  mechanical: true,
  partSlugs: [
    "module/key-respelling",
    "module/refactor-landing",
    "module/token-renaming",
    "module/type-renaming",
    "module/type-respelling",
  ],
  taking: [
    { said: "rename page-type", takes: "the act, and the namespace it is worked over" },
    { said: "rename property-slug", takes: "the act, and the namespace it is worked over" },
    { said: "rename token", takes: "the act, and the namespace it is worked over" },
    {
      said: "--from <name>",
      takes: "the page type's slug, the address a property stands at, or the name a body carries",
    },
    { said: "--to <slug>", takes: "the slug it becomes, or the key the property is read by" },
    { said: "--plural <slug>", takes: "the plural it becomes, on a page type rename alone" },
    { said: "--at <path>", takes: "the file exporting the name, on a name rename alone" },
    {
      said: "--line <n>",
      takes: "the line the name is declared on, on a name rename alone",
    },
    { said: "--in-strings", takes: "respell the name inside strings too, on a name rename alone" },
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
    "a name is named by the file exporting it, since one name is carried by many files.",
    "a name is renamed where the checker resolves to it rather than where a body spells it.",
    "--line picks one where the file declares that name in more than one place.",
    "a refusal for a name declared more than once names each line --line would take.",
    "--in-strings respells the name inside strings as well as where the checker resolves it.",
    "a distinctive name is safe to respell in a string, and a plain word standing in prose is not.",
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
      invariantKind: "departure",
      statement: "Every place the checker resolves to a renamed name is respelled in one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A name is named by the file exporting it rather than by the name on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A name standing for something else in its own scope is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name already carried in the file refuses a rename only where one of the two scopes encloses the other.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which declaration of a name carried more than once is renamed is named by a line.",
    },
    {
      invariantKind: "departure",
      statement: "A rename naming no line renames the one declaration or refuses the many.",
    },
    {
      invariantKind: "departure",
      statement: "Respelling a name inside strings is asked for rather than done by default.",
    },
    {
      invariantKind: "absence",
      statement: "A module named for a renamed page type is not renamed with it.",
    },
  ],
} as const satisfies Command
