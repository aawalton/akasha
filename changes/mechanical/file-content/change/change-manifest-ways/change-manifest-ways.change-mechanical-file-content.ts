import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changeManifestWays = {
  id: "01a0798b-3398-71d0-ba4b-fa40530ad360",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "change-manifest-ways",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-manifest",
  definition: "a manifest's ways in rewritten to follow the files those ways in name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A way in follows the file that way in names.",
    },
    {
      invariantKind: "departure",
      statement: "A way in whose file lands outside the package is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is rewritten by splicing the manifest's text.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest keeps the spacing the manifest already carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every way in is read against the folder the manifest arrives in.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest landing elsewhere is answered as a move rather than as a write.",
    },
    {
      invariantKind: "departure",
      statement: "A body reading as no JSON object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating no way in is answered as no edit.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "Each passage answered runs over the ways in changed whose lines meet.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here looks for the manifests standing above a path that moved.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or an index.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
