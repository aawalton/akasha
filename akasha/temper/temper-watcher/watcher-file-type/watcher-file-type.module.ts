import type { Module } from "@akasha/code-system/module"

export const watcherFileType = {
  id: "01a0633f-8d1e-7d45-9db2-961a53ae61f6",
  pageTypeSlug: "module",
  slug: "watcher-file-type",
  definition: "the kinds of saved-variables file the watcher carries across",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A kind is spelled in lower kebab case.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind the watcher knows is named in one list.",
    },
    {
      invariantKind: "departure",
      statement:
        "The type of a kind is read off the list of kinds rather than written out beside the list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which file on disk a kind is read from.",
    },
  ],
} as const satisfies Module
