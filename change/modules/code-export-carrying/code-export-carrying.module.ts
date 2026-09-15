import type { Module } from "akasha/code/module/module.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "Every export named is taken out of the source body in one plan.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The declarations are laid down in the order the source body had them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source body declaring nothing exported of a name handed in is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An export naming something its own body declares under no export is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every kind of exported declaration is carried the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each declaration is carried whole with the imports that declaration names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The imports the declarations carried name are written once between them all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name carried along with the others is named by no import of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carried import is spelled from the folder the declarations landed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carried import names what its path exports under the name the body gave it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An import written here names a type only where the thing that import names is a type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Carried names sharing one path are written as one import line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import naming the landing body is left out however that body is spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An export a carried body names from its own source file is imported from that source file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Carrying such an import of a value where the two bodies would name each other is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal is judged over every declaration carried rather than over one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An import the compiler erases is carried back where the two bodies name each other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A namespace import a carried body names goes with that declaration.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import the body left behind no longer names goes with the declarations.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which imports the body left behind no longer names is read once every declaration has gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Names the body left behind no longer takes from one line leave that line together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The import naming those exports at their landing is worked out over the body those departures leave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That import is one line naming every export the body left behind still takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That import is spelled from the root package where the root names a way in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The import back joins the line the body left behind already takes from that landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body importing an export carried names the path that export landed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body naming several of those exports is rewritten in one passage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An export carried joins the line the body naming it already takes from that landing.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A line that body takes from the landing under a default or a namespace is joined by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body naming such an export under another name goes on naming the export under that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body naming such an export through a package names the export from the workspace root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing path holding no body is answered as a body to write rather than as a passage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing path holding a body takes the declarations at the end of that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carried import joins the line the landing body already takes from that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import that body already names from another path is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing body that imported a declaration carried imports it no longer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing path already declaring an export named takes that export no second time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That export leaves the source body and every importer is repointed either way.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a body or answers an edit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a change.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A class is no declaration carried here.",
    },
  ],
} as const satisfies Module
