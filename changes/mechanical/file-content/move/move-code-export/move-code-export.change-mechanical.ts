import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const moveCodeExport = {
  id: "01a08799-4f75-7fb6-bcf9-3392494a57da",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "move-code-export",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file-content",
  definition: "one export moved from one code body to another, with every importer repointed",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing path anywhere in the repository is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path holding no body is written with the declaration carried there.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path already declaring that export is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path holding a body takes the declaration at the end of that body.",
    },
    {
      invariantKind: "departure",
      statement: "A landing body that imported what moved no longer imports it.",
    },
    {
      invariantKind: "departure",
      statement: "An import naming the landing body itself is left out rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "An import that body already names from another path is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The declaration leaves the body it came from and every importer is repointed either way.",
    },
    {
      invariantKind: "departure",
      statement: "A body declaring nothing exported of that name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind of exported declaration is moved the same way.",
    },
    {
      invariantKind: "departure",
      statement: "An import written here names a type only where the thing it names is a type.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration is carried whole with the imports that declaration names.",
    },
    {
      invariantKind: "departure",
      statement: "A carried import is spelled from the folder the declaration landed in.",
    },
    {
      invariantKind: "departure",
      statement: "An import the body left behind no longer names goes with the declaration.",
    },
    {
      invariantKind: "departure",
      statement:
        "The import naming it where it landed is worked out over the body those departures leave.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing that export names the path that export landed at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming that export through a package names it from the workspace root.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
