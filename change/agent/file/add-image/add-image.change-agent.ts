import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addImage = {
  id: "01a0d8af-2ae2-74bf-9141-797b10d92e3b",
  type: "page-type/change-agent",
  slug: "add-image",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "an image page, with its picture brought from a file outside the tree",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The picture is handed in as a whole path as `from`, and a title may be handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page's slug is worked out from the picture's bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The picture is read as the change is worked out, to name the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes landed are the bytes at `from` when the edits land.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are held beside the page and out of the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture that is neither png nor jpg is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture some image page is named for already is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
