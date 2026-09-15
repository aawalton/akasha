import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const packageReaching = {
  id: "01a05ae4-fc70-7001-89b1-ea70915be49e",
  type: "module",
  slug: "package-reaching",
  definition: "where each specifier naming a package lands, read from the manifests standing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The manifests are picked out of the paths handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A path with the file name the `workspace-manifest` property states is a manifest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller with no paths reads the manifests off the pages with a manifest property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The manifests are read from every property whose file has that file name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest is beside the page with that manifest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name that property states is asked of the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index stating no such property is answered as reaching nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a manifest names against is the folder the manifest stands in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body is read through the reader the caller hands in rather than off the disk here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest whose body does not stand is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rebuild is answered from the files its pages state.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A settle is answered from the manifests the index names and the paths the change has.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A settle reads no path the change leaves alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest the change has is read as the change leaves the manifest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where a specifier landed before a change is read from the manifests as those manifests were.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A manifest moving where a specifier lands answers with every importer of that specifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An importer is read off the index rather than found by walking the tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An importer the change already has is left out of that answer.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A specifier a manifest reaches anew answers with the importers that already name the specifier.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No specifier is resolved through `node_modules`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
