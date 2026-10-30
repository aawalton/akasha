import type { ChangeRunner } from "akasha/change/runner/change-runner.page-type.types.ts"

export const testChangeRunning = {
  id: "01a09ba5-d4ae-7f8d-a772-923fd8403538",
  type: "page-type/change-runner",
  slug: "test-change-running",
  definition: "the change runner that runs a change for a test",
  code: "ts",
  test: "ts",
  addressed: "ts",
  reached: "page-type/change",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A test reaches a change by the address that change is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is loaded off the world the repository itself is read as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is run over the world the test handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A test wanting the addresses reached rather than the edits names a world listing them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No change is imported here.",
    },
  ],
  createdAt: "2026-09-13T16:42:11.502Z",
  updatedAt: "2026-10-30T17:40:25.999Z",
} as const satisfies ChangeRunner
