import type { Module } from "../modules/module.page-type.ts"

export const codeSpecifier = {
  id: "01a04ea7-b2ea-711c-8256-13b0697772b3",
  pageTypeSlug: "module",
  type: "module",
  slug: "code-specifier",
  definition:
    "the strings a body holds, the ones naming a module, and the path tied to such a name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every way TypeScript names a module is read as one specifier.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body has is answered too.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is a string among the strings a body spells.",
    },
    {
      invariantKind: "departure",
      statement: "What names a module is read by the same walk and answered the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is answered with where the specifier is.",
    },
    {
      invariantKind: "departure",
      statement:
        "Specifiers are answered in the order written however deep in the body the specifiers sit.",
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
      statement: "Nothing else can be written over without reading its contents.",
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
      invariantKind: "departure",
      statement: "The specifier naming a path from a folder is worked out here for any caller.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier spelled for a path under the folder opens with a dot and a slash.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier spelled for a path outside the folder climbs to reach that path.",
    },
    {
      invariantKind: "departure",
      statement: "A path spelled as a specifier lands back on that path.",
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
        "A caller refusing a specifier that climbs out of the root keeps that rule where the rule belongs.",
    },
    {
      invariantKind: "absence",
      statement:
        "No package is named here, so a specifier spelt from the root is answered by the naming alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement:
        "A specifier is the string the source says whether or not the file that specifier names is there.",
    },
    {
      invariantKind: "departure",
      statement: "The source is parsed without parent links.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way in whose key closes with a star names every specifier opening with the part before it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The star is whatever the specifier has past that part, however many parts that is.",
    },
    {
      invariantKind: "departure",
      statement:
        "Such a specifier lands where that key's target says, with the star's part carried onto it.",
    },
    {
      invariantKind: "departure",
      statement: "A way in the naming names exactly is answered before any star is tried.",
    },
    {
      invariantKind: "departure",
      statement: "A way in with no star names one specifier and nothing beneath that specifier.",
    },
    {
      invariantKind: "departure",
      statement: "A way in whose target closes with no star names no landing.",
    },
  ],
} as const satisfies Module
