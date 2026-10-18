import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployExtensionPlacing = {
  id: "01a15007-4a3d-7625-babb-a98f73bdedc8",
  type: "page-type/module",
  slug: "deploy-extension-placing",
  definition: "a browser extension bundled and put in the folder Chrome loads it from",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The worker starts with `runWorker`, and the site code starts with `runSite`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest is read off the worker code without the worker being started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest naming any other file for the worker or the site code is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worker and the site code are each bundled into one plain script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bundle that refuses leaves Chrome's folder as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Chrome's folder is replaced whole, so no file of an earlier build is left in it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is packed and nothing here leaves this machine.",
    },
  ],
  createdAt: "2026-10-18T17:20:17.468Z",
  updatedAt: "2026-10-18T17:20:17.468Z",
} as const satisfies Module
