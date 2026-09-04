import type { Command } from "../../command-system/commands/command.page-type.ts"

export const refactor = {
  id: "01a0587b-6773-713a-8932-42c28462e9d0",
  pageTypeSlug: "command",
  slug: "refactor",
  definition: "a name the pages are spelled by changed everywhere it is spelled, as one act",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  partSlugs: [
    "module/key-respelling",
    "module/package-renaming",
    "module/refactor-arguing",
    "module/refactor-landing",
    "module/slug-renaming",
    "module/token-renaming",
    "module/type-renaming",
    "module/type-respelling",
  ],
  taking: [
    { said: "rename package", takes: "the act, and the namespace it is worked over" },
    { said: "rename page-slug", takes: "the act, and the namespace it is worked over" },
    { said: "rename page-type", takes: "the act, and the namespace it is worked over" },
    { said: "rename property-slug", takes: "the act, and the namespace it is worked over" },
    { said: "rename token", takes: "the act, and the namespace it is worked over" },
    {
      said: "--from <name>",
      takes: "a page type's slug, a page's address, a property's address, or a name a body carries",
    },
    { said: "--to <slug>", takes: "the slug or name it becomes, or the key a property is read by" },
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
    "a package rename takes the name it carries now and the name it becomes.",
    "a package rename moves no folder and changes no page's slug.",
    "a tracked file the index does not carry naming a renamed package is respelled too.",
    "`page-type` itself is refused, being the tail every page type's own file carries.",
    "a page slug rename takes the address a page is at, since a slug alone reaches no page.",
    "a page slug rename carries the page's own file and the files beside it to the new name.",
    "a spelling of the old slug it cannot judge to be an address is named rather than changed.",
    "--dry-run names every file it would carry; a landing says how many.",
    "a spelling it cannot judge to be a path is named in the answer rather than changed.",
    "a property is named by the address it stands at, since a key on its own reaches no property.",
    "a key rename carries no file, so it takes no plural and repoints no address.",
    "a name is named by the file exporting it, since one name is carried by many files.",
    "a name is renamed where the checker resolves to it rather than where a body spells it.",
    "--line picks one where the file declares that name in more than one place.",
    "a key and a name one shorthand welds together are renamed as one and need no line.",
    "a refusal for a name declared more than once names each line --line would take.",
    "--in-strings respells the name inside strings as well as where the checker resolves it.",
    "a distinctive name is safe to respell in a string, and a plain word standing in prose is not.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act names the namespace the act is worked over.",
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
      statement:
        "A page's slug is renamed by an act stated here rather than by a file arriving under another name.",
    },
    {
      invariantKind: "departure",
      statement: "A page slug rename carries the page's own file and every file beside that file.",
    },
    {
      invariantKind: "departure",
      statement: "A page slug rename names every place that still spells the old slug.",
    },
    {
      invariantKind: "departure",
      statement: "What a rename would touch is answered before the rename is asked to land.",
    },
    {
      invariantKind: "departure",
      statement: "Every file a rename touches lands in one commit or none of them does.",
    },
    {
      invariantKind: "departure",
      statement: "Every page of the renamed type states the slug that type becomes.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every address naming the type or a page of the type is repointed in the same commit.",
    },
    {
      invariantKind: "departure",
      statement: "Every file importing what moved is repointed in the same commit.",
    },
    {
      invariantKind: "departure",
      statement: "The type a page type declares is renamed with that page type.",
    },
    {
      invariantKind: "departure",
      statement: "The name a page type's value is imported under is renamed with that page type.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies a rename carries are read from the commit the rename sits on.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding uncommitted values is carried rather than rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of a file a rename carries is carried with that file.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` names every file the rename would carry.",
    },
    {
      invariantKind: "departure",
      statement: "A landing says how many files were carried rather than naming each.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming the renamed type is repointed wherever a body spells that path.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling standing between no path marks is named rather than changed.",
    },
    {
      invariantKind: "departure",
      statement: "An answer names every place that still names what was renamed.",
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
      statement:
        "A name is named by the file exporting that name rather than by the name on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A name that represents something else in its own scope is left unchanged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name already carried in the file refuses a rename only where either scope encloses the other.",
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
      statement: "A key one shorthand welds to a name is renamed with that name in one commit.",
    },
    {
      invariantKind: "departure",
      statement: "Respelling a name inside strings is asked for rather than done by default.",
    },
    {
      invariantKind: "absence",
      statement: "A module named for a renamed page type is not renamed with that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A package is renamed where its manifest calls the package that name.",
    },
    {
      invariantKind: "departure",
      statement: "Every manifest and every body spelling the renamed package is respelled.",
    },
    {
      invariantKind: "constraint",
      statement: "The index carries the pages rather than every file git tracks.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tracked file outside that folder naming a renamed package is respelled in the same commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files outside that folder name a renamed package is answered by searching what git tracks.",
    },
    {
      invariantKind: "absence",
      statement: "A package name the renamed name only opens is left as that name is.",
    },
    {
      invariantKind: "absence",
      statement: "A package rename moves no folder.",
    },
    {
      invariantKind: "absence",
      statement: "A package rename changes no page's slug.",
    },
  ],
} as const satisfies Command
