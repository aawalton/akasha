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
        "Not met at `509f0a454c2`; the three earlier survivors are closed. `mobile sim push-tap` is sharpest: `probing.pushed` `:160` writes an apns file on the MacBook and kills the app before the script's `exit 3`, which `mobile-ssh` `:226-230` throws on, so `:161`'s push never runs and `done` is empty — a bare `faulted` naming neither. Five `mobile sim` commands name the webview attach and not the act. Wording is settled: `type` `:94` for a done effect, sent-and-may-have-landed for the last.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
