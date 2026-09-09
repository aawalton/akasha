import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const moveCodeExport = {
  id: "01a0879d-8148-79b2-b976-efaa5137360f",
  pageTypeSlug: "change-agent",
  slug: "move-code-export",
  changeMode: "change-mode-move",
  definition: "one exported type moved to a sibling body, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path moved from, the path moved to and the type named are three arguments.",
    },
    {
      invariantKind: "departure",
      statement: "Working the move out is left to the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
