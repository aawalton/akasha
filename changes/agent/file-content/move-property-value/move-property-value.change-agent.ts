import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const movePropertyValue = {
  id: "01a09523-3d2f-7e8b-885b-e4fc2e8a3222",
  type: "change-agent",
  slug: "move-property-value",
  changeMode: "change-mode-move",
  definition:
    "one value carried into place in the list a page property holds, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The value carried is named by its place or by a field that value states.",
    },
    {
      invariantKind: "departure",
      statement: "The place it goes to is named by a place or by the value already holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming the value both ways is refused rather than read one way.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming the place it goes to neither way is refused.",
    },
    {
      invariantKind: "departure",
      statement: "`onto` is read under the field `where` names, so a call saying it says both.",
    },
    {
      invariantKind: "departure",
      statement: "A place that is no whole number is refused before the page is read.",
    },
    {
      invariantKind: "departure",
      statement: "Carrying the value is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "No value carried is resolved.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-authored",
} as const satisfies ChangeAgent
