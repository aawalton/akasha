import type { Module } from "../module/module.page-type.ts"

export const codeSpecifier = {
  id: "01a04ea7-b2ea-711c-8256-13b0697772b3",
  pageTypeSlug: "module",
  slug: "code-specifier",
  definition: "the strings a body holds, both the ones naming a module and all of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every way TypeScript names a module is read as one: an import or export naming where it comes from, a dynamic import, a require call, an import assignment, and a module named inside a type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every string a body holds is answered too, because a path is spelled in places where no module is named.",
    },
    {
      invariantKind: "departure",
      statement:
        "What names a module is a part of what a body spells, read by the same walk and answered the same way.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier is answered with where it stands, so the same reading serves a file being judged and a file being written over.",
    },
    {
      invariantKind: "departure",
      statement:
        "Specifiers are answered in the order they are written, however deep in the body they sit.",
    },
    {
      invariantKind: "absence",
      statement:
        "A template is no string here. Only a body's plain quoted text is answered, because nothing else can be written over without reading what fills it.",
    },
    {
      invariantKind: "absence",
      statement:
        "Where a specifier lands is not answered here. Every caller resolves it against a different rule, and a resolution held in common would be one rule serving none of them.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads the disk or the index. A specifier is what the source says, whether or not the file it names stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "The source is parsed without parent links, because nothing here climbs from a node to the one holding it.",
    },
  ],
} as const satisfies Module
