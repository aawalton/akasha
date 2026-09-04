import type { CodeCheck } from "../../code-check.page-type.ts"

export const typecheck = {
  id: "01a04bcb-dff4-761a-856e-407fb6934b44",
  pageTypeSlug: "code-check",
  slug: "typecheck",
  definition: "the check refusing TypeScript that does not compile",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
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
      statement: "The index read is the one the change leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module a page type names as its loader is not compiled for a change to a page of that type.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that is not there is refused rather than read as one naming no importer.",
    },
    {
      invariantKind: "absence",
      statement: "A file the change does not reach is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "A file under a router app's routes folder is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "A router app's root route is not judged.",
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
      statement: "A router app's routes and its root route are judged by the app's own compile.",
    },
    {
      invariantKind: "departure",
      statement: "Every declaration file akasha holds is compiled with every change.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file states globals no import reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file compiled this way is not itself judged.",
    },
    {
      invariantKind: "absence",
      statement: "Its standing errors are the audit's.",
    },
    {
      invariantKind: "departure",
      statement: "One program is built for a set of changes however many files that set holds.",
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
      statement: "Nothing is reported against it and a file still importing it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic naming no file is thrown rather than reported.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read from what the check is handed rather than from the disk.",
    },
    {
      invariantKind: "departure",
      statement: "What is judged is judged as the change would leave what is judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package manifest is input to this code check as readily as a body of TypeScript.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier is resolved through the manifest the change leaves rather than the one the disk holds.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest the change carries reaches the files its ways in name.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is read from the manifest before the change and from the one after it.",
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
