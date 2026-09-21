import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const pointBookLinksAtSections = {
  id: "01a0c51c-4184-74e1-bdcc-12ed5a5f6bf5",
  type: "page-type/change-agent",
  slug: "point-book-links-at-sections",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition:
    "every link a book's prose spells as a file path pointed at the section that path names",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link is pointed at the section whose page sits where that link's path reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path reaching no page is answered by the one section of that book whose name the path ends in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name fitting more than one section of that book leaves its link alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link left alone is no refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The anchor a link carries is kept on the address that link becomes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One edit is made for each file, however many links that file carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many files one run points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are walked in the order their paths sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file spelling no such link is left unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The book a section is in is read by following what each section is a section of.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
