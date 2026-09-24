import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const nameAmbientDeclarations = {
  id: "01a0c4bb-3270-7b2a-89ee-8fd6574e53c2",
  type: "page-type/change-agent",
  slug: "name-ambient-declarations",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the declarations a file's ambient names come from, named by that file's own imports",
  code: "ts",
  test: "ts",
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a file spells and nothing in that file binds is looked for in a declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a name the parse reads as a reference is looked for in a declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A JSX attribute, a key, a string, a comment or a keyword names no declaration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a type parameter declares is bound by that parameter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a file reaches on `globalThis` is looked for in a declaration too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The declarations are read from the index rather than looked for in the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration is any file carrying ambient types, whatever page it sits beside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration named for a file is read for the names that declaration reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration declaring one of those names is named by that file as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The import added names one declaration file rather than a glob over declarations.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already naming that declaration has nothing added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where more than one declaration declares the name, the one sharing the most folders is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The import is added after the last import the file already carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file carrying no import at all takes the added imports at its opening.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are walked in the order their paths sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run names declarations in at most the count of files handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path handed in to leave alone is left as it is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A declaration file itself is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name no declaration declares is left alone.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A declaration a file reaches through a specifier or `import.meta` is named by hand.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds a program or reads a compiler's diagnostic.",
    },
  ],
} as const satisfies ChangeAgent
