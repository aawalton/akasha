import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removePage = {
  id: "01a0776d-8d1e-7f93-a0e2-4c566d49f8fd",
  type: "change-agent",
  slug: "remove-page",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page taken away, by the partial change fitting the kind of page named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the naming grammar reads as no page file is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal for a page type names the change that takes a page type away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page that is no page type is handed to the partial change taking that kind of page away.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page property is handed to the partial change taking a page property away.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
