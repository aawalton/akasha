import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removePropertyValue = {
  id: "01a07944-9ee0-7f93-a8d0-b0e845bdd929",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-property-value",
  changeMode: "change-mode-remove",
  definition: "one value taken out of one page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "absence",
      statement: "No value taken out is resolved.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming no page is taken out as any other value is.",
    },
    {
      invariantKind: "departure",
      statement: "Taking the value out is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "departure",
      statement: "A page left named by no parent is refused by the checks rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
