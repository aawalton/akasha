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
        "TypeScript names a module by an import or an export naming where the export comes from or a dynamic import or a require call or an import assignment or a module named inside a type.",
    },
    {
      invariantKind: "departure",
      statement: "Every way TypeScript names a module is read as one specifier.",
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
      statement: "What names a module is read by the same walk and answered the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is answered with where the specifier stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Specifiers are answered in the order the specifiers are written however deep in the body the specifiers sit.",
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
        "Where a relative specifier lands is answered as the path the specifier names and nothing more.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier naming a package lands where the naming handed in says the specifier lands.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing in no naming is answered as naming no package.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a landing may be reached is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "No manifest is read here.",
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
