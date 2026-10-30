import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changeFileContent = {
  id: "01a07810-fb33-7e75-8e1e-ce1e302d5668",
  type: "page-type/change-mechanical-file-content",
  slug: "change-file-content",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "a change that replaces a passage of a body with another passage",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One call works one passage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage that is not alone in the body is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage the body has nowhere is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage of no characters is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with no body is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change leaving the body as the body was is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body worked on is the body the world answers rather than the body on disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges what the passage put in leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The calling change judges what the passage put in leaves.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
  createdAt: "2026-09-06T18:52:53.939Z",
  updatedAt: "2026-10-30T17:06:55.107Z",
} as const satisfies ChangeMechanicalFileContent
