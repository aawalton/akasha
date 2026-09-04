import type { Module } from "@akasha/code-system/module"

export const proseRouting = {
  id: "01a0687f-ed12-7000-9465-97c4c88eb633",
  pageTypeSlug: "module",
  slug: "prose-routing",
  definition:
    "the file route standing beside a flag that takes prose, so a shell need not carry it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag carrying prose gains a route flag named for it with `-file` on the end.",
    },
    {
      invariantKind: "departure",
      statement: "A flag taking no value gains no route.",
    },
    {
      invariantKind: "departure",
      statement:
        "A route reads its value from a file, or from standard input where the path is `-`.",
    },
    {
      invariantKind: "departure",
      statement: "A route flag whose name is already taken is not synthesized a second time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hand-declared route beside a flag shaped as a line is refused, because its handler would read the file itself and bypass the single-line parse.",
    },
    {
      invariantKind: "departure",
      statement: "A value routed as a line loses the line terminators at its end.",
    },
    {
      invariantKind: "departure",
      statement: "Saying both a flag and its route says one thing twice, and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A route on a flag that repeats repeats too.",
    },
  ],
} as const satisfies Module
