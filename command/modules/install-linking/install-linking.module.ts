import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const installLinking = {
  id: "01a09247-d31a-7256-813e-77eef6451d1b",
  type: "module",
  slug: "install-linking",
  definition: "the file a page holds linked where that page says the file is reached from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page saying where the file it holds is reached has that file linked there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file linked is the one the page holds its body in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page saying so is weighed rather than only the pages a change moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link already naming that file is left as it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link naming anything else is taken away and made again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Something there that is no link is left as it is and said as wrong.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not there is said as wrong rather than linked to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A placing a page states for another kind of machine is not made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming no kind of machine is placed on every kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The home a tilde opens onto is the one handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two pages naming one link place that link once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link that could not be placed is said rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The path a link is placed at is read off the page rather than off a table here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a file inside the repository.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says a link already naming what the page says.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A repository with no index has nothing weighed.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A placing said anywhere, not only under the home, is made here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A placing is made here whatever rights that placing needs.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Which page types state a placing is read off the pages rather than a table here.",
    },
  ],
} as const satisfies Module
