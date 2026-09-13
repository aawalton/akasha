import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandArguments = {
  id: "01a09263-b049-757c-8bce-377d6682545a",
  type: "initiative",
  slug: "athena-command-arguments",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "234 of 237 by the check at `9b56121c79b`: 15 refusals over three commands. Two are settled: `change apply`, where saying nothing is the instruction to land, and `change draft` with it. The third is `alan tracking`, and it is a property of the command: `file-arguing`'s `readIn` pairs each `--file-path` with the `--content-file` after it, while `takingIn` keys a repeating argument by slug and records no place, so a converted call would accept an unpaired path where today it refuses. Alan's.\n",
    },
  ],
} as const satisfies Initiative
