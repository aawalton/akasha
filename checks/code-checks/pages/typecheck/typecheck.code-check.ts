import type { CodeCheck } from "../../code-check.page-type.ts"

export const typecheck = {
  id: "01a04bcb-dff4-761a-856e-407fb6934b44",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "typecheck",
  definition: "the check refusing TypeScript that does not compile",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A type holds or fails across files.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files judged are the change and every file that imports the change however far.",
    },
    {
      invariantKind: "departure",
      statement: "Which file imports which is read from the index rather than from the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The index read is the index the change leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module a page type names as its loader is not compiled for a change to a page of that type.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that is not there is refused rather than read as an index naming no importer.",
    },
    {
      invariantKind: "absence",
      statement: "A file the change does not reach is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "A file importing a router app's generated route types is not judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file under a routes folder importing no generated route types is judged like any other file.",
    },
    {
      invariantKind: "constraint",
      statement: "The one program built here states no root directories.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A route reaches its generated types through the root directories its package states.",
    },
    {
      invariantKind: "constraint",
      statement: "A router app's generated route types stand outside the repository.",
    },
    {
      invariantKind: "gap",
      statement: "A file importing generated route types is judged by its own app's compile.",
    },
    {
      invariantKind: "departure",
      statement: "Every declaration file akasha has is compiled with every change.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file states globals no import reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file the change reaches is judged as any other file is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A file another config compiles is compiled by that config rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A lua runtime library's config names the files that config compiles.",
    },
    {
      invariantKind: "departure",
      statement: "One program is built for a set of changes however many files that set holds.",
    },
    {
      invariantKind: "departure",
      statement: "The program is built over the files judged and the declarations alone.",
    },
    {
      invariantKind: "constraint",
      statement: "This compiler draws in no ambient types the settings do not name.",
    },
    {
      invariantKind: "departure",
      statement: "The settings name every ambient type the packages folder has.",
    },
    {
      invariantKind: "departure",
      statement:
        "The config the program is built from is served to the compiler rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing this run worked out is kept for the next.",
    },
    {
      invariantKind: "departure",
      statement:
        "A diagnostic against a file the change did not touch is reported once against that file.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is not there for the compiler.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the change takes away is answered as absent rather than read from the disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is reported against that path and a file still importing that path is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read from the change the check is handed rather than from the disk.",
    },
    {
      invariantKind: "departure",
      statement: "Each file judged is judged as the change would leave that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package manifest is input to this code check as readily as a body of TypeScript.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier is resolved through the manifest the change leaves rather than the manifest on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace package is reached where the manifest the change leaves sits.",
    },
    {
      invariantKind: "departure",
      statement: "A package the change brings into being needs no link on disk to be reached.",
    },
    {
      invariantKind: "departure",
      statement: "A package the change moves is judged where that change lands the package.",
    },
    {
      invariantKind: "departure",
      statement:
        "The compiler is told a package's real path from the placement rather than from the link.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest the change has reaches the files its ways in name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way in is read from the manifest before the change and from the manifest after that change.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those files are judged together with everything importing those files however far.",
    },
    {
      invariantKind: "departure",
      statement: "A way in naming a file that is nowhere reaches nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page being created is compiled against its type less the properties a generator fills.",
    },
    {
      invariantKind: "departure",
      statement: "The type a body is held to is narrowed and no diagnostic is suppressed.",
    },
    {
      invariantKind: "departure",
      statement: "The narrowing is written on the line the `satisfies` clause already stands on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page being created and carrying no `satisfies` clause is compiled as the page stands.",
    },
    {
      invariantKind: "absence",
      statement: "No import is added for the narrowing.",
    },
    {
      invariantKind: "gap",
      statement: "A type error never lands.",
    },
  ],
} as const satisfies CodeCheck
