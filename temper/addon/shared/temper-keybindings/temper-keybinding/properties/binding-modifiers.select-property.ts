import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const bindingModifiers = {
  id: "01a18478-1f8a-737c-8005-6d235d8a94d8",
  type: "page-type/select-property",
  slug: "binding-modifiers",
  propertySlug: "modifiers",
  definition: "the keys held down with a bound key",
  values: ["KEY_CTRL", "KEY_ALT", "KEY_SHIFT", "KEY_COMMAND"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A modifier is named by the constant the game gives that key.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T21:43:47.335Z",
  updatedAt: "2026-10-28T21:43:47.335Z",
} as const satisfies SelectProperty
