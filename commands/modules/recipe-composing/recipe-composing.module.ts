import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const recipeComposing = {
  id: "01a08dd3-479a-794b-bdd2-2b24e59840c6",
  pageTypeSlug: "module",
  type: "module",
  slug: "recipe-composing",
  definition: "the recipe a container recipe's composing group writes beside that page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recipe is written by a machine rather than composed by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "Every container recipe keeping a composing group is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A container recipe keeping no composing group has nothing run for it.",
    },
    {
      invariantKind: "departure",
      statement: "A group sits beside its page as that page's `composing` section.",
    },
    {
      invariantKind: "departure",
      statement: "A group writes the one recipe beside the page keeping that group.",
    },
    {
      invariantKind: "departure",
      statement: "A group answering to no `recipeIn` function is said rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A group that breaks is said rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe already with the body that would be written again is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A hand edit to a recipe is written over rather than kept.",
    },
    {
      invariantKind: "departure",
      statement: "The recipes are composed again only where the change could turn what they hold.",
    },
    {
      invariantKind: "departure",
      statement: "A change carrying a page or a recipe could turn what a recipe holds.",
    },
    {
      invariantKind: "departure",
      statement: "A group reads the index the change leaves rather than the committed index.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
    {
      invariantKind: "departure",
      statement: "A group the change itself writes is said rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A group runs off the checkout rather than off the change.",
    },
  ],
} as const satisfies Module
