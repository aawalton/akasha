import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addPropertyValue = {
  id: "01a07944-9edf-70c7-8101-db279ee5ea45",
  type: "change-agent",
  slug: "add-property-value",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value put into one page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key naming a relation has its value resolved before any body is worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming no page is refused where the key names a relation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key naming no relation takes its value unresolved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Putting the value in is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`after` is handed on where the caller states `after`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where the caller states no `after`, the key the page's own type puts this one after is handed on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the property has one value is read from the type the page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page's type declares no property for is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal over a slug the page's type declares a key for names the key to write instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is judged before any page is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose type cannot be read has no key refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a property holds is read from the type the page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property holding a boolean or a number is handed on as holding it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`after` is left out where the pages of this page's type write the key nowhere.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
