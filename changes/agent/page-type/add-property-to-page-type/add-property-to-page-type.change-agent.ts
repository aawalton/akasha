import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addPropertyToPageType = {
  id: "01a081e1-00ca-7879-a25f-c734368cb78a",
  type: "change-agent",
  slug: "add-property-to-page-type",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property declared on one page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is handed to the mechanical change declaring a property on one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The declaration and the part are that change's one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count is handed in named `max-count` and handed on named `maxCount`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`required` and `many` are handed in as text and handed on as truths.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal from that change is the refusal this act gives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The generator writes the page type's own type again from what this leaves.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No change but that one rung is reached.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
