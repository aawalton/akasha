import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const codeExportCarrying = {
  id: "01a09c3d-8d88-7d7f-9070-14c87fa1b4b2",
  type: "module",
  slug: "code-export-carrying",
  definition: "the passages carrying named exports out of one code body and into another",
  code: "ts",
  types: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every export named is taken out of the source body in one plan.",
    },
    {
      invariantKind: "departure",
      statement: "The declarations are laid down in the order the source body had them.",
    },
    {
      invariantKind: "departure",
      statement: "A source body declaring nothing exported of a name handed in is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An export naming something its own body declares under no export is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind of exported declaration is carried the same way.",
    },
    {
      invariantKind: "departure",
      statement: "Each declaration is carried whole with the imports that declaration names.",
    },
    {
      invariantKind: "departure",
      statement: "The imports the declarations carried name are written once between them all.",
    },
    {
      invariantKind: "departure",
      statement: "A name carried along with the others is named by no import of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A carried import is spelled from the folder the declarations landed in.",
    },
    {
      invariantKind: "departure",
      statement: "A carried import names what its path exports under the name the body gave it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import written here names a type only where the thing that import names is a type.",
    },
    {
      invariantKind: "departure",
      statement: "Carried names sharing one path are written as one import line.",
    },
    {
      invariantKind: "departure",
      statement: "An import naming the landing body is left out however that body is spelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "An export a carried body names from its own source file is imported from that source file.",
    },
    {
      invariantKind: "departure",
      statement:
        "Carrying such an import of a value where the two bodies would name each other is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is judged over every declaration carried rather than over one.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the compiler erases is carried back where the two bodies name each other.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace import a carried body names goes with that declaration.",
    },
    {
      invariantKind: "departure",
      statement: "An import the body left behind no longer names goes with the declarations.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which imports the body left behind no longer names is read once every declaration has gone.",
    },
    {
      invariantKind: "departure",
      statement:
        "Names the body left behind no longer takes from one line leave that line together.",
    },
    {
      invariantKind: "departure",
      statement:
        "The import naming those exports at their landing is worked out over the body those departures leave.",
    },
    {
      invariantKind: "departure",
      statement: "That import is one line naming every export the body left behind still takes.",
    },
    {
      invariantKind: "departure",
      statement: "That import is spelled from the root package where the root names a way in.",
    },
    {
      invariantKind: "departure",
      statement:
        "The import back joins the line the body left behind already takes from that landing.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing an export carried names the path that export landed at.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming several of those exports is rewritten in one passage.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body naming such an export under another name goes on naming the export under that name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body naming such an export through a package names the export from the workspace root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing path holding no body is answered as a body to write rather than as a passage.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path holding a body takes the declarations at the end of that body.",
    },
    {
      invariantKind: "departure",
      statement: "A carried import joins the line the landing body already takes from that path.",
    },
    {
      invariantKind: "departure",
      statement: "An import that body already names from another path is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A landing body that imported a declaration carried imports it no longer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing path already declaring an export named takes that export no second time.",
    },
    {
      invariantKind: "departure",
      statement: "That export leaves the source body and every importer is repointed either way.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body or answers an edit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
    {
      invariantKind: "absence",
      statement: "A class is no declaration carried here.",
    },
  ],
} as const satisfies Module
