import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const removeManifestWays = {
  id: "01a0798b-3398-72f0-8d29-c5c8301326de",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "remove-manifest-ways",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-manifest",
  definition: "a manifest's ways in dropped where the files those ways in name go",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A way in landing on a path that goes is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A way in whose file stays is left where that way in is.",
    },
    {
      invariantKind: "departure",
      statement: "A way in is dropped by splicing the manifest's text.",
    },
    {
      invariantKind: "departure",
      statement: "The entries under any key a caller names are spliced out the same way.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest keeps the spacing the manifest already carries.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest a way in went out of reads as JSON.",
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
      invariantKind: "absence",
      statement: "Nothing here looks for the manifests standing above a path that goes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or an index.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest stating one way in as text has that way in judged.",
    },
    {
      invariantKind: "departure",
      statement: "That way in landing on a path that goes takes the whole key with it.",
    },
    {
      invariantKind: "departure",
      statement: "That way in landing on a path that stays is left where that way in is.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
