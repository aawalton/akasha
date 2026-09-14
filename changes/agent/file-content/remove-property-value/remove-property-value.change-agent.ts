import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removePropertyValue = {
  id: "01a07944-9ee0-7f93-a8d0-b0e845bdd929",
  type: "change-agent",
  slug: "remove-property-value",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value taken out of one page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No value taken out is resolved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming no page is taken out as any other value is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Taking the value out is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page left named by no parent is refused by the checks rather than here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
