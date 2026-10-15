import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCatalogImportSkillEquations = {
  id: "01a1403c-b1e2-7500-b70f-213de6b7ce0a",
  type: "page-type/command",
  slug: "temper-catalog-import-skill-equations",
  definition: "the command keeping UESP's equations on each skill page whose ability UESP fit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill page is matched to UESP's row by its ability id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill page that keeps equations already is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every skill page the table reaches lands in one change.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "UESP's table is behind a browser check, so a browser saves it first.",
    },
  ],
  name: "import-skill-equations",
  arguments: [{ argument: "argument/uesp-table", required: true }],
  createdAt: "2026-10-15T15:44:41.953Z",
  updatedAt: "2026-10-15T15:44:41.953Z",
} as const satisfies Command
