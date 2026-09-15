import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const groupWriting = {
  id: "01a08dd3-479a-794b-bdd2-2b24e59840c6",
  type: "module",
  slug: "group-writing",
  definition: "the file a page's module property group writes beside that page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file a group writes is written by a machine rather than by an agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group is named by the file property whose file that group writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type carrying a group is read from the index rather than named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page keeping a group a file property names is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page keeping no group has nothing run for it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group sits beside its page as that page's section named for the group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group writes the one file the property naming that group names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file a group writes is named by that property rather than by the group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group answering to no `bodyIn` function is said rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group that breaks is said rather than refusing the landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file already with the body that would be written again is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hand edit to a file a group writes is written over rather than kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files are written again only where the change could turn what they hold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change carrying a page or a file with no ending could turn what a file holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group reads the index the change leaves rather than the committed index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body a group writes turns where that index turns and the group's code does not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page moving turns every body a group composes from where that page sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file no change names is written again where what a group reads turned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No group is named here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page type carrying a group is named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group whose code the change adds is said rather than run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group runs off the body the change leaves rather than off the checkout.",
    },
  ],
} as const satisfies Module
