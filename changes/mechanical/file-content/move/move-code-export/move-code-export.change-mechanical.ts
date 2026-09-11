import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const moveCodeExport = {
  id: "01a08799-4f75-7fb6-bcf9-3392494a57da",
  type: "change-mechanical",
  slug: "move-code-export",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file-content",
  definition: "one export moved from one code body to another, with every importer repointed",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
      statement: "A landing path already declaring that export is left as that path is.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path holding a body takes the declaration at the end of that body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing body that imported the declaration moved no longer imports that declaration.",
    },
    {
      invariantKind: "departure",
      statement: "An import naming the landing body is left out however that body is spelled.",
    },
    {
      invariantKind: "departure",
      statement: "An import that body already names from another path is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration leaves its old body and every importer is repointed either way.",
    },
    {
      invariantKind: "departure",
      statement: "A body declaring nothing exported of that name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An export naming something its own body declares under no export is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind of exported declaration is moved the same way.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import written here names a type only where the thing that import names is a type.",
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
      statement: "A carried import names what its path exports under the name the body gave it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An export the moved body names from its own source file is imported from that source file.",
    },
    {
      invariantKind: "departure",
      statement: "Carrying such an import where the two bodies would name each other is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace import the moved body names goes with that declaration.",
    },
    {
      invariantKind: "departure",
      statement: "An import the body left behind no longer names goes with the declaration.",
    },
    {
      invariantKind: "departure",
      statement:
        "Names the body left behind no longer takes from one line leave that line together.",
    },
    {
      invariantKind: "departure",
      statement:
        "The import naming the export at its landing is worked out over the body those departures leave.",
    },
    {
      invariantKind: "departure",
      statement: "That import is spelled from the root package where the root names a way in.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing that export names the path that export landed at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body naming that export under another name goes on naming the export under that name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "A class is no declaration moved here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body naming that export through a package names the export from the workspace root.",
    },
    {
      invariantKind: "departure",
      statement:
        "The import back joins the line the body left behind already takes from that landing.",
    },
    {
      invariantKind: "departure",
      statement: "A carried import joins the line the landing body already takes from that path.",
    },
    {
      invariantKind: "departure",
      statement: "Carried names sharing one path are written as one import line.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
