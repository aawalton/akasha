import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonCompiling = {
  id: "01a090b7-a5e7-7ce6-a88c-6379f90dab43",
  type: "module",
  slug: "addon-compiling",
  definition: "an addon transpiled to Lua, with what it ships written back beside that Lua",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon with no tsconfig is compiled against settings written from its page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon whose page names no bundle entry refuses the compile.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An addon's build output is emptied before the addon is compiled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sibling addon's build output is emptied beside the addon shipping the sibling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A compile leaving no bundle refuses rather than reporting a build.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A compile that fails is answered with what the compiler said about the failure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The build output an emptied folder held is written again once the Lua is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A compile that refused names every file it had already written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The compile is bounded at an hour.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The whole roster is compiled in the order the canonical names sort.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first addon that does not compile ends a run over the roster.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run over the roster is answered as the count and the bytes rather than each line.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the game's addons folder.",
    },
  ],
} as const satisfies Module
