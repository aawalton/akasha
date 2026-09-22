import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renamePagePropertyPropertySlug = {
  id: "01a0819e-9047-7f45-850f-d66e47cf03e4",
  type: "page-type/change-agent",
  slug: "rename-page-property-property-slug",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property-property-slug",
  definition: "a property's key spelled anew on that property's page and on every page with it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument this change was handed no value for is refused by its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole rename is worked out by the one rung this change reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That rung is reached through the runner rather than by importing that rung's code.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
