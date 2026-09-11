import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theModuleAuditOfTheCommandSystemIsUnreviewed = {
  id: "01a09125-3ba1-74c9-b215-67060099b232",
  type: "finding",
  slug: "the-module-audit-of-the-command-system-is-unreviewed",
  domain: "page-type/command",
  claim:
    "An audit read the modules under `commands/modules` against their callers, asking which boundaries are real and which are accidents of growth, and proposed eleven things that are not so and should be. Eight have since landed as intents on `initiative/athena-command-modules`, and one was so already, the address-mapping module having gone since. Two are unreviewed, and they live nowhere but a transcript. They move code to the domain that owns what it does. Each is a candidate intent rather than a decision, and one of them needs Alan to settle which argument parser survives.",
  evidence:
    "Unreviewed, each with what it rests on.\n\n1. One scanner reads a command's flags off its argv. `flags/command-flags.module.code.ts:15-52`, `file-arguing.module.code.ts:161-210` and `inventory-file-arguing.module.code.ts:9-36` are the same loop with divergent edges. `change-arguing.module.code.ts:5-15` and `seat-act-calling.module.code.ts:7-16` apply an identical first-bare-word rule. The declarative parser that would replace them, `parse-args.module.code.ts:96`, is reached by no command — only by `seat-system/seat-reset`, `seat-resume` and `seat-start`. Alan settles whether `parse-args` is adopted or moved to `seat-system` with its callers.\n\n2. `cli` prints an answer and gives it an exit code, which is what `cli.module.ts:8` says. Around the one dispatch line at `cli.module.code.ts:54` sit root resolution at `:27-35`, git authorship at `:38-39`, the exit-code vocabulary at `:11-19`, fault catching at `:47-58` and a byte write with an EAGAIN retry at `:61-71`. The vocabulary is stranded: `service-putting-up.module.code.ts:11` and `workload-applying.module.code.ts:26` re-declare `OPERATIONAL = 3` rather than import it.\n",
} as const satisfies Finding
