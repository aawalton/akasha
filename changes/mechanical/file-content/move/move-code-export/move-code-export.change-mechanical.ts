import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const moveCodeExport = {
  id: "01a08799-4f75-7fb6-bcf9-3392494a57da",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "move-code-export",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file-content",
  definition:
    "one exported type moved from one code body to a sibling body, with every importer repointed",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing path outside the folder the body sits in is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path holding no body is written with the declaration carried there.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path already declaring that exported type is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path holding a body declaring no such exported type is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The declaration leaves the body it came from and every importer is repointed either way.",
    },
    {
      invariantKind: "departure",
      statement: "A body declaring no exported type of that name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration is carried whole, with the imports that declaration names.",
    },
    {
      invariantKind: "departure",
      statement: "An import the body left behind no longer names goes with the declaration.",
    },
    {
      invariantKind: "departure",
      statement: "Every body importing that type names the path that type landed at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A generated body naming that type is left to the thing that writes it.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming that type through a package names it from the workspace root.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
