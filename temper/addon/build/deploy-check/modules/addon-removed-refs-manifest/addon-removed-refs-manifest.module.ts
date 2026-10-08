import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonRemovedRefsManifest = {
  id: "01a06365-e827-7003-af97-b8511950c909",
  type: "page-type/module",
  slug: "addon-removed-refs-manifest",
  definition: "the globals of third-party add-ons this suite no longer needs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every global named here states the add-on the global belonged to.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every global named here states the remedy that took the removed add-on's place.",
    },
  ],
  createdAt: "2026-09-02T18:33:38.087Z",
  updatedAt: "2026-09-22T13:44:02.000Z",
} as const satisfies Module
