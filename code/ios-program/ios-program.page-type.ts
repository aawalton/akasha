import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const iosProgram = {
  id: "01a05901-26b3-7d1b-aec6-3b467f5f5b8d",
  type: "page-type/page-type",
  slug: "ios-program",
  definition: "a thing an iOS package builds",
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
    "multi-relation-property/components",
    "text-property/target-name",
  ],
  extends: ["page-type/domain"],
  properties: [
    {
      pageProperty: "multi-relation-property/components",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/target-name", required: false, many: false },
    { pageProperty: "code-file-property/main", required: false, many: false },
    { pageProperty: "file-property/info-plist", required: false, many: false },
    { pageProperty: "file-property/entitlements", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A program's top level statements sit in the file named main.swift.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A program with top level statements compiles no component stating a start of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Swift names no imports between the files of one program.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seam copies a program's files to the names Xcode reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program names every component that program compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A component named by more than one program is a shared component.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A component no program names is compiled into nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The app a program is in states that program's name and signing profile.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A program shipped apart from the app that has that program states its own target.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
