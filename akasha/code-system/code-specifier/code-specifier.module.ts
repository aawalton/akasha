import type { Module } from "../module/module.page-type.ts"

export const codeSpecifier = {
  id: "01a04ea7-b2ea-711c-8256-13b0697772b3",
  pageTypeSlug: "module",
  slug: "code-specifier",
  definition: "the strings a body holds, the ones naming a module, and where such a name lands",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "TypeScript names a module by an import or an export naming where it comes from or a dynamic import or a require call or an import assignment or a module named inside a type.",
    },
    {
      invariantKind: "departure",
      statement: "Every way TypeScript names a module is read as one.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body holds is answered too.",
    },
    {
      invariantKind: "departure",
      statement: "What names a module is a part of what a body spells.",
    },
    {
      invariantKind: "departure",
      statement: "It is read by the same walk and answered the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is answered with where it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Specifiers are answered in the order they are written however deep in the body they sit.",
    },
    {
      invariantKind: "absence",
      statement: "A template is no string here.",
    },
    {
      invariantKind: "absence",
      statement: "Only a body's plain quoted text is answered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing else can be written over without reading what fills it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a relative specifier lands is answered as the path it names and nothing more.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a landing may be reached is not judged here.",
    },
    {
      invariantKind: "absence",
      statement:
        "A caller refusing one that climbs out of the root or answering one spelt from the root keeps that rule where it belongs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "A specifier is what the source says whether or not the file it names stands.",
    },
    {
      invariantKind: "departure",
      statement: "The source is parsed without parent links.",
    },
  ],
} as const satisfies Module
