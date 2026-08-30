import type { Check } from "../check.page-type.ts"

export const typecheck = {
  id: "01a04bcb-dff4-761a-856e-407fb6934b44",
  pageTypeSlug: "check",
  slug: "typecheck",
  definition: "the check refusing TypeScript that does not compile",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The settings the compiler runs under are stated here.",
    },
    {
      invariantKind: "constraint",
      statement: "A type holds or fails across files.",
    },
    {
      invariantKind: "departure",
      statement: "The files judged are the change and every file that imports it — however far.",
    },
    {
      invariantKind: "departure",
      statement: "Which file imports which is read from the index — never from the disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "The index read is the one the change leaves: a page the change takes away declares nothing and what its page type says loads it is not compiled for that change.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that is not there is refused rather than read as one naming no importer.",
    },
    {
      invariantKind: "absence",
      statement:
        "A file the change does not reach is not judged. Its standing errors are the audit's.",
    },
    {
      invariantKind: "departure",
      statement: "One program is built for a set of changes — however many files that set holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A diagnostic against a file the change did not touch is reported once — against that file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the change takes away is not there for the compiler: nothing is reported against it and a file still importing it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A diagnostic naming no file is thrown — never reported.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read from what the check is handed — never from the disk.",
    },
    {
      invariantKind: "departure",
      statement: "What is judged is judged as the change would leave it.",
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
        "A page being created and carrying no `satisfies` clause is compiled as it stands.",
    },
    {
      invariantKind: "absence",
      statement: "No import is added for the narrowing. `Omit` is TypeScript's own.",
    },
    {
      invariantKind: "gap",
      statement: "A type error never lands.",
    },
  ],
} as const satisfies Check
