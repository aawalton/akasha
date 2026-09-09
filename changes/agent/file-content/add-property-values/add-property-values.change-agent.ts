import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const addPropertyValues = {
  id: "01a08881-c01c-75fd-94e8-42afd3afb064",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "add-property-values",
  changeMode: "change-mode-add",
  definition: "many values put into the properties their lines name, in one call",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each line names a page, a key, and the value put into that key.",
    },
    {
      invariantKind: "departure",
      statement: "The value is the rest of the line, so a value carrying a space is taken whole.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is not a path, a key and a value parted by spaces is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A line with nothing on it is read over.",
    },
    {
      invariantKind: "departure",
      statement: "A call handing in no line is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming a relation has its value resolved before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming no page is refused where the key names a relation.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming no relation takes its value unresolved.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the property has one value is read from the type the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A line is put in against the world the lines before it leave.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal at any line refuses the whole call and names that line.",
    },
    {
      invariantKind: "departure",
      statement: "A call that refuses puts in no value at all.",
    },
    {
      invariantKind: "departure",
      statement: "Putting each value in is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says where among a property's values a value lands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
