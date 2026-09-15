import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const exportOptionsPlist = {
  id: "01a05cee-e560-75d1-bc5d-3afdaa86f77d",
  type: "page-type/module",
  slug: "export-options-plist",
  definition: "the plist that tells Xcode which profile signs which bundle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The profile uuids and the certificate hash sit in the plist as shell variable names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An app stating no widget bundle id gets no second provisioning-profile entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plist names manual signing rather than automatic.",
    },
  ],
} as const satisfies Module
