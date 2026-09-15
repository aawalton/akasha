import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeSpecifier = {
  id: "01a04ea7-b2ea-711c-8256-13b0697772b3",
  type: "module",
  slug: "code-specifier",
  definition:
    "the strings a body holds, the ones naming a module, and the path tied to such a name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every way TypeScript names a module is read as one specifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module a test replaces is named by a specifier like any other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every string a body has is answered too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier is a string among the strings a body spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What names a module is read by the same walk and answered the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier is answered with where the specifier is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Specifiers are answered in the order written however deep in the body the specifiers sit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A template is no string here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Only a body's plain quoted text is answered.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing else can be written over without reading its contents.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where a relative specifier lands is answered as the path the specifier names and nothing more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A specifier naming a package lands where the naming handed in says the specifier lands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The specifier naming a path from a folder is worked out here for any caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier spelled for a path under the folder opens with a dot and a slash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier spelled for a path outside the folder climbs to reach that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path spelled as a specifier lands back on that path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether a landing may be reached is not judged here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No manifest is read here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A caller refusing a specifier that climbs out of the root keeps that rule where the rule belongs.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A specifier is the string the source says whether or not the file that specifier names is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The source is parsed without parent links.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A way in whose key closes with a star names every specifier opening with the part before the star.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The star is whatever the specifier has past that part however many parts that is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Such a specifier lands where that key's target says with the star's part carried onto that target.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A way in the naming names exactly is answered before any star is tried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A way in with no star names one specifier and nothing beneath that specifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A way in whose target closes with no star names no landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller handing in no naming is answered as naming no package but the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A specifier opening with the root package's name lands on the path that specifier names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The root package's name is the one package name written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A naming naming a root specifier is answered before the root package's name.",
    },
  ],
} as const satisfies Module
