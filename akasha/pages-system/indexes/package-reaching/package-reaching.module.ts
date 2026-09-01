import type { Module } from "@akasha/code-system/module"

export const packageReaching = {
  id: "01a05ae4-fc70-7001-89b1-ea70915be49e",
  pageTypeSlug: "module",
  slug: "package-reaching",
  definition: "where each specifier naming a package lands, read from the manifests standing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifests are picked out of the paths handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose file name is the one the `manifest` property states is a manifest.",
    },
    {
      invariantKind: "departure",
      statement: "The name that property states is asked of the index.",
    },
    {
      invariantKind: "departure",
      statement: "An index stating no such property is answered as reaching nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a manifest names against is the folder the manifest stands in.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read through what the caller hands in rather than off the disk here.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest whose body does not stand is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A caller holding only a root is answered once and held.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild is answered from the files its pages state.",
    },
    {
      invariantKind: "departure",
      statement:
        "A settle is answered from the paths the index names and the paths the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest the change carries is read as the change leaves the manifest.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a specifier landed before a change is read from the manifests as they were.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest moving where a specifier lands answers with every importer of that specifier.",
    },
    {
      invariantKind: "departure",
      statement: "An importer is read off the index rather than found by walking the tree.",
    },
    {
      invariantKind: "departure",
      statement: "An importer the change already carries is left out of that answer.",
    },
    {
      invariantKind: "gap",
      statement:
        "A specifier a manifest reaches anew answers with the importers that already name the specifier.",
    },
    {
      invariantKind: "absence",
      statement: "No specifier is resolved through `node_modules`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
