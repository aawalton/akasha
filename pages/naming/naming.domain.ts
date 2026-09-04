import type { Domain } from "@akasha/domains/domain"

export const naming = {
  id: "01a05341-b9a9-7d68-88b3-142e3e3ecd4d",
  pageTypeSlug: "domain",
  slug: "naming",
  definition: "how one idea's name is chosen",
  partSlugs: ["workspace-package/named-for"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder's word is true of everything under it and of nothing outside it.",
    },
    {
      invariantKind: "departure",
      statement: "A word in a folder is paid for by every path under that folder.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Search First",
      act: "Name and place every file so an agent searching with ripgrep finds what it needs.",
      warrant:
        "An agent starts cold with no memory of the tree, so what search misses does not exist to it.",
      aids: [
        "A hit's path alone must say what was found.",
        "Never add structure no search will use.",
      ],
    },
  ],
} as const satisfies Domain
