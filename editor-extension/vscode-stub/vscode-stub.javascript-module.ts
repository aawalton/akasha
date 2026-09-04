import type { JavascriptModule } from "@akasha/code-system/javascript-module"

export const vscodeStub = {
  id: "01a06957-955c-7cf6-9b2b-b7ef62ac9c75",
  pageTypeSlug: "javascript-module",
  slug: "vscode-stub",
  definition: "a `vscode` keeping what an extension draws into it, so a panel can be read back",
  javascript: "mjs",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This lands under node as the `vscode` an activation resolves.",
    },
    {
      invariantKind: "departure",
      statement: "A member content passes through keeps what was written into it.",
    },
    {
      invariantKind: "departure",
      statement: "A tree item keeps the label it was constructed with.",
    },
    {
      invariantKind: "departure",
      statement: "A tree view keeps the provider it was created with.",
    },
    {
      invariantKind: "departure",
      statement: "A status bar item reads back the text assigned to it.",
    },
    {
      invariantKind: "departure",
      statement: "Every other member answers a proxy answering anything.",
    },
    {
      invariantKind: "constraint",
      statement: "A proxy is a constructor only where the function behind it is one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A proxy hands back a fresh proxy, so a row written into one is not there to read.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is taken by asking each registered provider down its whole tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what was drawn.",
    },
    {
      invariantKind: "gap",
      statement: "An extension reaches far more of the editor's interface than is named here.",
    },
  ],
} as const satisfies JavascriptModule
