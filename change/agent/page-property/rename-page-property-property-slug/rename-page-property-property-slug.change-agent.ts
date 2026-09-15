import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renamePagePropertyPropertySlug = {
  id: "01a0819e-9047-7f45-850f-d66e47cf03e4",
  type: "change-agent",
  slug: "rename-page-property-property-slug",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property-property-slug",
  definition: "one property's key spelled anew on that property's page and on every page with it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument this change was handed no value for is refused by its key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole rename is worked out by the one rung this change reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That rung is reached through the runner rather than by importing that rung's code.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
