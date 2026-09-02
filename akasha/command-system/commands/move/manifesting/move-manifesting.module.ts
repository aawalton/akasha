import type { Module } from "@akasha/code-system/module"

export const moveManifesting = {
  id: "01a05d7c-6c95-76a9-aa74-4cf4fa0300f2",
  pageTypeSlug: "module",
  slug: "move-manifesting",
  definition: "a package manifest rewritten so the file each way in lands on follows what moved",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A manifest is looked at only where a file under its folder moves.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests looked at are found by walking up from what moved.",
    },
    {
      invariantKind: "departure",
      statement: "A file under nested packages is answered for by every manifest above the file.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that moves is looked at as every other manifest is.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is read from the folder the manifest was in.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is written from the folder the manifest arrives in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest moving with everything the manifest names keeps the paths the manifest already states.",
    },
    {
      invariantKind: "departure",
      statement: "A way in whose file lands outside the package is taken out of the manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest whose one string for its exports lands outside states no exports.",
    },
    {
      invariantKind: "departure",
      statement: "A rewritten manifest is answered with the path the manifest arrives at.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is written back as its values rather than as its text.",
    },
    {
      invariantKind: "absence",
      statement: "A manifest that will not parse is left as it is.",
    },
    {
      invariantKind: "absence",
      statement: "A target that is no string names no way in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "gap",
      statement: "A target nested under a condition is repointed as a plain one is.",
    },
    {
      invariantKind: "gap",
      statement: "A file named by `main` or `bin` is repointed as one named by `exports` is.",
    },
  ],
} as const satisfies Module
