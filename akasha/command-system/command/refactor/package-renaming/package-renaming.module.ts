import type { Module } from "@akasha/code-system/module"

export const packageRenaming = {
  id: "01a05db4-4c3b-7000-846e-a71e6c71e1e3",
  pageTypeSlug: "module",
  slug: "package-renaming",
  definition: "a workspace package's name changed wherever a body or a manifest spells it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package is found by the manifest calling it that name.",
    },
    {
      invariantKind: "departure",
      statement: "A name no manifest under the akasha folder carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name another package already carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling names the package where it is the whole name.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling names it where the name is followed by a slash.",
    },
    {
      invariantKind: "absence",
      statement: "A longer name this one only opens is not the package.",
    },
    {
      invariantKind: "departure",
      statement: "A way in past the name keeps the tail it already carries.",
    },
    {
      invariantKind: "departure",
      statement: "A body is respelled at the string literals the parser finds.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming the package is respelled whether or not it names a module.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is respelled over its quoted text rather than through its values.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest keeps every byte the rename does not reach.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming the package is respelled as a value naming it is.",
    },
    {
      invariantKind: "absence",
      statement: "A file that is neither code nor a manifest is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests read are the ones the index names under the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says how many manifests and how many bodies were respelled.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says a file outside the akasha folder was not looked for.",
    },
    {
      invariantKind: "absence",
      statement: "No folder moves and no page's slug changes.",
    },
    {
      invariantKind: "gap",
      statement: "A name spelled inside a template is respelled as one written whole is.",
    },
    {
      invariantKind: "stopgap",
      statement: "The workspace reaches a package by the name it was installed under.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "A rename therefore lands only where the new name was installed before the checks ran.",
    },
    {
      invariantKind: "gap",
      statement: "A renamed package is reachable by its new name without another command.",
    },
  ],
} as const satisfies Module
