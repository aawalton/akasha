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
      statement: "Every argument a command takes is a page.",
      workingMemory:
        "338 argument pages and 766 entries at `2422666aa8c` naming exactly those 338 — nothing dangling, no page no command names. Three flags are read that no page names: `--restated` and `--break-the-glass`, both through `file-arguing` and reaching only `alan tracking`, and `--settings`, read by `seat-refresh-settings`'s own code while its page names only `argument/json`. Alan's: `alan-tracking.command.ts:14-15` says no call names the kind of change landed here.\n",
    },
    {
      statement: "A command names the arguments it takes and narrows each.",
      workingMemory:
        "Six keys narrow an argument and `default` sits on the argument page. Seven shapes the vocabulary cannot say, all Alan's: an enum over text; a real number; a range; a per-command default; a conditional group, as `--ref-audio` wants a transcript; `--content-file` read against the `--file-path` before it; and an argument refused rather than taken, as `read --seat`. The `path` kind says a path is read against the repository root and no reader does it.\n",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "`takenFor` is the one reader, and the check's three blind spots are mended: module code under `commands/pages`, a call followed one file on, a dynamic `await import()`. 79 refusals over 39 files became 188 over 56, and the swarm has it at 71 over 28. One reader is outside: `parse-args`, whose last caller is Alan's `sr`, which runs the resume module directly for a handshake and a `--no-launch` the page rightly refuses to name. Alan's: retiring it means changing what `sr` runs.\n",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "213 of 235 reach the type at `8c05bfa52f66`, 200 calling `takenFor` and 13 through `inventory-rule-calling`; `seat start` has landed since and 18 of the rest are temper. Its seat-name refusal widened from the first word to any lone stray word, and its shim and help module are gone. Held: `alan tracking` on two frozen modules, and `change apply` and `change draft` because `takingIn` swallows `--`, so `akasha change apply --` would land every kept edit where today it refuses.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "30 spellings are carried by more than one argument page at `b365d4a17ab`, down from 37 at `e659f26d471`: `--to` by six, `--query` by five, `--file-path`, `--all` and `--from` by four, then 19 pairs. No command names two alike, so no call is ambiguous. Each page was minted for one meaning with the contested spelling kept, which claims nothing and changes nothing a caller types. Alan's: does one argument having one spelling rename these 30?\n",
    },
  ],
} as const satisfies Initiative
