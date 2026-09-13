import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const moveCodeExport = {
  id: "01a08799-4f75-7fb6-bcf9-3392494a57da",
  type: "change-mechanical",
  slug: "move-code-export",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "one export moved from one code body to another, with every importer repointed",
  code: "ts",
  test: "ts",
  guards: ["change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A landing path anywhere in the repository is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A landing path holding no body is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the change making a file that is not there yet.",
    },
    {
      invariantKind: "departure",
      statement: "One export is carried by one call.",
    },
    {
      invariantKind: "departure",
      statement: "What the carrying leaves is worked out by the module this change names.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal that module answers is the refusal this change answers.",
    },
    {
      invariantKind: "departure",
      statement: "Each passage the carrying leaves is written by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out which passages the carrying leaves.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
