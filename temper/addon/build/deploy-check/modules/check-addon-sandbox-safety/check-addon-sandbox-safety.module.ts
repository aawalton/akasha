import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkAddonSandboxSafety = {
  id: "01a06365-e827-7007-b638-ed3fec2ee814",
  type: "page-type/module",
  slug: "check-addon-sandbox-safety",
  definition: "the run judging whether an emitted bundle names a symbol the game strips",
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
      statement: "A bundle that could not be read ends the run with the bundles read so far named.",
    },
  ],
  createdAt: "2026-09-02T18:33:38.087Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module
