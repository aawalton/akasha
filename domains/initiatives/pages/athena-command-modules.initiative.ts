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
        "Both aliases are taken: `refusedAll` over 12 callers at `ea092d2`, `refusing` over 6 at `5f8725d`, both exit codes run live. A class no literal scan sees is open: `answeredWith(x, [], OK)` is `told` said the long way. `asJson` is refused by `json ? [JSON.stringify(x)] : lines`, the commonest shape. Out for good: `command-answering`, `calling`, `service-unit-asking`, `service-putting-up`. Alan's: do `workload-applying`'s `Applied` and `service-putting-up`'s `PutUp` answer a command?\n",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "Closed but for one. The email forwarder landed at `2f26a81b78`: mail sent, an unsubscribe POSTed, an archive at Gmail, each named on the line after it lands and above the log write. `handleInboundSms` is no instance, since its `:114` is reached only where the first delivery refused before writing. The `sentTo` abort-timeout retry is recorded on `page-calling`. Alan's: `icloud fetch` hands one list that is both its answer and what it did, and parting them changes what a caller reads.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
