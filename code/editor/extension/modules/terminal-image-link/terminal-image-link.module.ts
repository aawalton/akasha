import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const terminalImageLink = {
  id: "01a0e96a-7a16-72f2-ad46-4a8d997a8604",
  type: "page-type/module",
  slug: "terminal-image-link",
  definition: "an image a terminal line names, opened beside the terminal on a click",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is named in a terminal line by its address, `image/<slug>`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The link is found in the text the terminal draws rather than in what a program wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An image whose bytes are on this workstation opens in the editor beside the terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image whose bytes are not on this workstation is said to have none.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A click never opens the browser.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No image is drawn inside the terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor is handed in rather than imported.",
    },
  ],
} as const satisfies Module
