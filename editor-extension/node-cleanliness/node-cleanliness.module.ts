import type { Module } from "@akasha/code-system/module"

export const nodeCleanliness = {
  id: "01a06954-f7dc-76b7-bb15-538baf68f93e",
  pageTypeSlug: "module",
  slug: "node-cleanliness",
  definition: "whether what the editor's extension host loads reaches only what node carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The editor's extension host is node.",
    },
    {
      invariantKind: "constraint",
      statement: "Electron runs the host as a utility process under its own node build.",
    },
    {
      invariantKind: "constraint",
      statement: "`utilityProcess.fork` takes no option naming another binary.",
    },
    {
      invariantKind: "departure",
      statement: "The entry point judged is the one the host loads.",
    },
    {
      invariantKind: "departure",
      statement: "The entry point is read from the extension's manifest rather than spelled here.",
    },
    {
      invariantKind: "absence",
      statement: "No list of entry points is kept here.",
    },
    {
      invariantKind: "departure",
      statement: "A module no entry point's bundle reaches becomes an entry point of its own.",
    },
    {
      invariantKind: "departure",
      statement: "That step repeats until nothing under the package is left over.",
    },
    {
      invariantKind: "departure",
      statement: "A module the host never loads is counted apart from the entry points.",
    },
    {
      invariantKind: "departure",
      statement: "An entry point is bundled for node and the whole bundle is judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "`Bun.*`, `import.meta.path`, `import.meta.dir` and `import.meta.dirname` are refused.",
    },
    {
      invariantKind: "departure",
      statement: "`import.meta.main` is carried, node holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A reach answering nothing under node is worse than a reach that throws.",
    },
    {
      invariantKind: "departure",
      statement: "A reach in a file also spelling `typeof Bun` is carried rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "That rule asks the file rather than the path through it.",
    },
    {
      invariantKind: "departure",
      statement: "A reach standing at the bundle's top level is refused whatever its file spells.",
    },
    {
      invariantKind: "departure",
      statement: "A name inside a quote is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A quote is judged one line at a time.",
    },
    {
      invariantKind: "gap",
      statement: "A global named inside a template literal spanning lines is read as code.",
    },
    {
      invariantKind: "departure",
      statement: "The bundle is then imported under node against a stub `vscode`.",
    },
    {
      invariantKind: "departure",
      statement: "That second stage sees only what runs at import, which is where activation dies.",
    },
    {
      invariantKind: "departure",
      statement: "Both stages must pass.",
    },
    {
      invariantKind: "departure",
      statement: "A guarded reach is carried rather than proved.",
    },
    {
      invariantKind: "departure",
      statement: "Every guarded reach is counted and named where the run closes.",
    },
    {
      invariantKind: "absence",
      statement: "No branch is run here, so no guard's node side is proved here.",
    },
  ],
} as const satisfies Module
