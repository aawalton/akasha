import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const iosProgram = {
  id: "01a05901-26b3-7d1b-aec6-3b467f5f5b8d",
  type: "page-type",
  slug: "ios-program",
  definition: "one thing an iOS package builds",
  parts: [
    "code-file-property/main",
    "file-property/entitlements",
    "file-property/info-plist",
    "ios-program/alanwalton-app",
    "ios-program/alanwalton-decode-harness",
    "ios-program/alanwalton-widget",
    "ios-program/smilingjenny-app",
    "ios-program/smilingjenny-decode-harness",
    "ios-program/smilingjenny-widget",
    "relation-property/components",
    "text-property/profile-name",
    "text-property/target-name",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "text-property/bundle-id", required: false, many: false },
    {
      pageProperty: "relation-property/components",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/profile-name", required: false, many: false },
    { pageProperty: "text-property/target-name", required: false, many: false },
    { pageProperty: "code-file-property/main", required: false, many: false },
    { pageProperty: "file-property/info-plist", required: false, many: false },
    { pageProperty: "file-property/entitlements", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program's top level statements sit in the file named main.swift.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A program with top level statements compiles no component stating a start of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Swift names no imports between the files of one program.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seam copies a program's files to the names Xcode reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program names every component that program compiles.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A component named by more than one program is a shared component.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A component no program names is compiled into nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program Apple signs states the profile that program is signed against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program shipped apart from the app that has that program states its own name.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
