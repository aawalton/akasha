import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkAddonRemovedRefs = {
  id: "01a06365-e827-7008-ba28-298e223f8538",
  type: "page-type/module",
  slug: "check-addon-removed-refs",
  definition: "the run judging whether an emitted bundle still reaches a removed add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The population the run states is the emitted bundles under the build output.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A bundle examined is a bundle whose text was read.",
    },

    {
      decisionKind: "decision-kind/constraint",
      statement: "A bundle no longer on disk is skipped rather than counted as examined.",
    },
  ],
  createdAt: "2026-09-02T18:33:38.087Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module
