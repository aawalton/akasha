import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const gatherInterfaceDeclarations = {
  id: "01a0c4da-fa68-7796-ad07-59a919549f57",
  type: "page-type/change-agent",
  slug: "gather-interface-declarations",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "the declarations of one interface gathered into the one file that declares it",
  code: "ts",
  test: "ts",
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An interface more than one declaration file declares is gathered into one file.",
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
      statement: "The interfaces are gathered in the order their names sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run gathers at most the count of interfaces handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path handed in to leave alone holds back every interface that path declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The declaration files are read from the index rather than looked for in the tree.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An interface one file alone declares is left alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An interface is left alone where a file it is in would be left with nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds a program or reads a compiler's diagnostic.",
    },
  ],
} as const satisfies ChangeAgent
