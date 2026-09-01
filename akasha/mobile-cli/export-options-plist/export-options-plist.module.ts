import type { Module } from "@akasha/code-system/module"

export const exportOptionsPlist = {
  id: "01a05cee-e560-75d1-bc5d-3afdaa86f77d",
  pageTypeSlug: "module",
  slug: "export-options-plist",
  definition: "the plist that tells Xcode which profile signs which bundle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The profile uuids and the certificate hash sit in the plist as shell variable names.",
    },
    {
      invariantKind: "absence",
      statement: "An app stating no widget bundle id gets no second provisioning-profile entry.",
    },
    {
      invariantKind: "departure",
      statement: "The plist names manual signing rather than automatic.",
    },
  ],
} as const satisfies Module
