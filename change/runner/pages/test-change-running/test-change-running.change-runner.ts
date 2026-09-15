import type { ChangeRunner } from "akasha/change/runner/change-runner.page-type.types.ts"

export const testChangeRunning = {
  id: "01a09ba5-d4ae-7f8d-a772-923fd8403538",
  type: "page-type/change-runner",
  slug: "test-change-running",
  definition: "the runner a test reaches a change through rather than importing that change",
  code: "ts",
  test: "ts",
  addressed: "ts",
  reached: "page-type/change",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test reaches a change by the address that change is filed under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The change is loaded off the world the repository itself is read as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The change is run over the world the test handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A test wanting the addresses reached rather than the edits names a world listing them.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No change is imported here.",
    },
  ],
} as const satisfies ChangeRunner
