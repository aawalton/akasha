import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueMisc = {
  id: "01a0b6bf-9d20-7bb4-a1d0-ee8c4e02c793",
  type: "page-type/initiative",
  slug: "nimue-misc",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "No module keeps its type declarations in a file beside its code.",
      workingMemory:
        "`import type` is erased and is no cycle edge, so the module-types sidecar earns nothing. Two users: code-export-carrying (no caller outside its own folder) and change-answer (232 importers, repointed by move-code-export). Then `file-property/module-types`, the `types-file-runs-nothing` check and the file-length decision telling the two `types` sections apart all go.",
    },
  ],
} as const satisfies Initiative
