import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addPageProperty = {
  id: "01a09ffa-1b65-7dce-8f7e-d009956028c7",
  type: "change-agent",
  slug: "add-page-property",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property",
  definition:
    "one page property made, with its page, its part, every declaration of it and every page's key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument this change was handed no value for is refused by its key.",
    },
    {
      invariantKind: "departure",
      statement: "The page types declaring the property are handed in one to a line.",
    },
    {
      invariantKind: "departure",
      statement: "A line with nothing on it is read over.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no page type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "`required` and `many` are handed in as text and handed on as truths.",
    },
    {
      invariantKind: "departure",
      statement: "A default the caller states nowhere is handed on as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The whole making is worked out by the one rung this change reaches.",
    },
    {
      invariantKind: "departure",
      statement:
        "That rung is reached through the runner rather than by importing that rung's code.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
