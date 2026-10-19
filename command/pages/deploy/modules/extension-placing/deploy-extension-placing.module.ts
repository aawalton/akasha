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
      statement:
        "The manifest is read off the worker's `MANIFEST` without the worker being started.",
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
      statement: "Chrome's folder is kept, and each file in it is replaced whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser sandbox keeping a link to the folder still reaches it after a deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No file of an earlier build is left in the folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worker exporting `ICON` as a PNG in base64 has it placed as `icon.png`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build is stamped by what its files hold, so an unchanged build keeps its stamp.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is packed and nothing here leaves this machine.",
    },
  ],
  createdAt: "2026-10-18T17:20:17.468Z",
  updatedAt: "2026-10-19T16:45:29.559Z",
} as const satisfies Module
