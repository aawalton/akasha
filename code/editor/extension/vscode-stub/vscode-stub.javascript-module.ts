import type { JavascriptModule } from "akasha/code/javascript-modules/javascript-module.page-type.types.ts"

export const vscodeStub = {
  id: "01a06957-955c-7cf6-9b2b-b7ef62ac9c75",
  type: "javascript-module",
  slug: "vscode-stub",
  definition: "a `vscode` keeping what an extension draws into it, so a panel can be read back",
  javascript: "mjs",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module lands under node as the `vscode` an activation resolves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member content passes through keeps the value written into that member.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree item keeps the label that tree item was constructed with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree view keeps the provider that tree view was created with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status bar item reads back the text assigned to that status bar item.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other member answers a proxy answering anything.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A proxy is a constructor only where the function behind that proxy is one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A proxy hands back a fresh proxy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row written into a proxy is not there to read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reading is taken by asking each registered provider down its whole tree.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the values drawn.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An extension reaches parts of the editor's interface no page here names.",
    },
  ],
} as const satisfies JavascriptModule
