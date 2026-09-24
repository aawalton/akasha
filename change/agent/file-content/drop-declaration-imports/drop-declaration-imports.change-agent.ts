import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const dropDeclarationImports = {
  id: "01a0d5c2-d5fe-7a78-b594-4228e72d99a5",
  type: "page-type/change-agent",
  slug: "drop-declaration-imports",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the imports of declarations a file names and reaches nothing in, dropped",
  code: "ts",
  test: "ts",
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each import to drop is handed in as a file's path and the specifier it imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An import is dropped only where no name the file spells reaches that declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is read as the declaration naming reads a name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every declaration declaring a name the file reaches is kept, not only the closest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import a name still reaches is refused rather than left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import the file does not carry is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file whose only imports are dropped opens on its first statement.",
    },
  ],
} as const satisfies ChangeAgent
