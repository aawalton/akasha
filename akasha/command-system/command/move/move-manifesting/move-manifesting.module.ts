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
      statement: "A file under nested packages is answered for by every manifest above it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way in is repointed only where the file it lands on arrives inside the package.",
    },
    {
      invariantKind: "departure",
      statement: "A file arriving outside the package is left for the checks to refuse.",
    },
    {
      invariantKind: "absence",
      statement: "A manifest that moves is not rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest moving with everything it names keeps the paths it already states.",
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
