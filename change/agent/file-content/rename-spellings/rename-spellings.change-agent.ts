import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renameSpellings = {
  id: "01a0c6a4-1550-79dd-90c7-9032b858cc71",
  type: "page-type/change-agent",
  slug: "rename-spellings",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "a spelling renamed in every file under a folder, whatever kind of file that is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each line of the renames names an old spelling and the new spelling, parted by a space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is not two spellings parted by a space is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line with nothing on it is read over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing in no line is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A spelling matches only where no letter, digit or underscore sits on either side of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A spelling inside a string literal is renamed as a bare one is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every text file under the folder is read, whatever kind of file it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is not text is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a machine writes is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every occurrence in one file is answered in one edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pair whose old spelling occurs nowhere under the folder refuses the whole call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename that renames nothing is a misspelling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pair whose new spelling already occurs under the folder refuses the whole call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rename onto a spelling already there would merge two names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that refuses renames nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a body as code.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
