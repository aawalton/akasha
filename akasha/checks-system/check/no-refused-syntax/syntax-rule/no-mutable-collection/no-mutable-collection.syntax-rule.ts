import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noMutableCollection = {
  id: "01a0523b-0107-71e6-9dc1-2f51c9c51690",
  pageTypeSlug: "syntax-rule",
  slug: "no-mutable-collection",
  definition: "the rule refusing a collection anything but the body that made it can change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A collection handed out stands only in its readonly form, so `T[]`, `Array<T>`, a tuple, `Set<T>` and `Map<K, V>` are refused at a parameter, a return, a property and a type alias.",
    },
    {
      invariantKind: "departure",
      statement:
        "`Set` and `Map` are judged beside the array forms, a mutable one handed out being as open as a mutable array.",
    },
    {
      invariantKind: "departure",
      statement:
        "A type is followed all the way down, so a mutable collection held inside a readonly one is refused where it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body may change a collection it made and no other, one it bound to a literal or to `new` being its own to fill.",
    },
    {
      invariantKind: "departure",
      statement:
        "A collection a body was handed is not one it made, so a walk filling what it was given is refused and answers with what it found instead.",
    },
    {
      invariantKind: "departure",
      statement:
        "A collection made and filled inside one body and handed back readonly is reached by nobody as mutable, so a builder confined that way stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a collection can be reached from is what is judged, never whether it changes, so a stateful walk whose maps and sets never leave the body holding them stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A local's own annotation is not judged, a name inside one body being reachable by nobody outside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A collection a call handed back is not one this body made, so `.sort()` on one is refused and `.toSorted()` stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a body binds twice, once to what it made and once to what it was handed, is taken as handed.",
    },
    {
      invariantKind: "gap",
      statement:
        "A write through an index is not seen, a subscript naming a place in an array and a key naming a field being one spelling here.",
    },
    {
      invariantKind: "gap",
      statement:
        "A collection handed out by a body stating no return type is not seen, a type being read as it is written and never inferred.",
    },
  ],
} as const satisfies SyntaxRule
