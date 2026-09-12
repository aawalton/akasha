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
        "`refusedAll`, `refusing` and their callers are gone, the last at `637c8169`. `answeredWith` is a second public builder with 90 non-test calls over 35 files, and `faulted`, `unclassified` and `answering`'s own catch build the record by hand inside `command-answering`. Alan's: `told` is exported three times for three meanings — build an answer, run a git command, and `inventory-rule-calling`'s — so a file importing one cannot take another.\n",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "Not closed. `icloud fetch` complies: `wroteEach` pushes each written path onto `done` under `answering`. Three survive. `inference wan generate` `:57` and `inference wan extend` `:59` both answer `{ report, refusals: [whyOf(thrown)], code: OPERATIONAL }` while `wan-clip-rendering` `:148-155` has already written the staged images; `git restore` `:337-353` puts restored paths in the report, which the refusal never names. `partWay` appends to refusals and `keeping` does both.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
