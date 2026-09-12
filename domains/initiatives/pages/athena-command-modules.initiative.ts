import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandModules = {
  id: "01a09264-7109-79f3-9a3d-dd638b13652a",
  type: "initiative",
  slug: "athena-command-modules",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement: "One function builds a command's refusal.",
      workingMemory:
        "`refusedBy` at `command-answering.module.code.ts` builds every refusal reached through a named way, and the four named ways stay — dropping them rewrites an import line in about 100 files and no act does that. Eleven landings, `74c55e8d512` through `ca7aac7b952`, took inline-built refusals from 194 across 106 files to 116 across 84. Two are Alan's: `apply-running`'s `Folded` flattens a data fault to 3, and `index-refresh` cannot reach a builder without a circular import.",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "Every case found is closed: deploy names what reached a machine (`9bafe896a32`), `inference segment` names each file as it writes (`0f5b19cfaf4`), and `akasha index refresh` names its finished stages and the file in hand (`0f1f8e961e6`, `81b7ea09c75`, `ff2ffe9a34e`), drawn live against a scratch repository. `answering` hands every command a list 46 others could fill. A sweep is running for any command that writes before it throws and says nothing.",
    },
    {
      statement: "A refusal's exit code says what kind of thing went wrong.",
      workingMemory:
        "The fork was one claim: a handle the caller typed is the caller's mistake, so `seat-handle` was wrong and `calling` was right; mended across `seat-handle`, `takeover-seat` and `model-gateway-swap` in `d79b5e3d30b` through `bbbdc7e147c`. Both halves of `applying` are settled. What is left is the bare literal: 40+ `.code.ts` files still spell `code: 0/1/2/3` by hand, which `no-second-exit-code` cannot see.",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
