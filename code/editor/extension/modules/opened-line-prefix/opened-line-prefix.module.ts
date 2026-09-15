import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const openedLinePrefix = {
  id: "01a09c52-8d87-74ad-91e7-06ebd71239d7",
  type: "module",
  slug: "opened-line-prefix",
  definition: "the prefix a line opened under another line carries from it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An opened line carries the leading whitespace of the line it opens under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line opened under a bullet carries that marker and the spacing after it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bullet marker is a hyphen, an asterisk or a plus.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A line opened under a numbered item carries the next number, that delimiter and that spacing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The number carried is one past the number the item states rather than one past the list's count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number's delimiter is a full stop or a closing parenthesis.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A marker with no space after it is no marker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item with nothing after its marker ends the list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line opened under an item that ends the list carries its indent and no marker.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the lines above the line handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a checkbox.",
    },
  ],
} as const satisfies Module
