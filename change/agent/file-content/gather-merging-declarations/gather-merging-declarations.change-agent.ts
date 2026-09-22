import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const gatherMergingDeclarations = {
  id: "01a0c4da-fa68-7796-ad07-59a919549f57",
  type: "page-type/change-agent",
  slug: "gather-merging-declarations",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the declarations of a merging name put into the file that declares it",
  code: "ts",
  test: "ts",
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An interface, a function and a namespace each merge across the files declaring it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A merging name more than one declaration file declares is gathered into one file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The file it gathers into is the one with the shortest path, then the first to sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each declaration moves whole, so the members it holds are not merged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The declarations arriving are put after what the file already holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "They arrive in the order their files sort, then the order each file holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A declaration leaving takes the blank line before it, and the file ends in one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are gathered in the order those names sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run gathers at most the count of names handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path handed in to leave alone holds back every name that path declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The declaration files are read from the index rather than looked for in the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration is any file carrying ambient types, whatever page it sits beside.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name one file alone declares is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name that does not merge is left alone, two files declaring it being refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name is left alone where a file declaring it would be left with nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds a program or reads a compiler's diagnostic.",
    },
  ],
} as const satisfies ChangeAgent
