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
        "338 argument pages, and 765 entries name exactly those 338 — no dangling reference, no page no command names. Every one of 235 command pages names its arguments or states `arguments: []`, `07e31081ea85`. One flag is read that no page names: `--restated`, admitted by `file-arguing` and reaching only `alan tracking`. Alan's: `alan-tracking.command.ts:14-15` says no call names the kind of change landed here, so either that goes or the flag does.\n",
    },
    {
      statement: "A command names the arguments it takes and narrows each.",
      workingMemory:
        "Six keys: `argument`, `required`, `saidAs`, `notWith`, `repeats`, `oneOf`; `default` sits on the argument page. Of 74 bare pages 1 understated its code, and where a page feeds `takenFor` the page is the enforcement. Four shapes no page states, all Alan's: `--content-file` read against the `--file-path` before it; a group required only when another is said, as `--ref-audio` wants a transcript; a default one command has and another lacks; an argument refused rather than taken, as `read --seat`.\n",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "`takenFor` is the one reader, and both of the check's blind spots are mended at `3ae22245d60`: it judges module code under `commands/pages` and follows a call one file on. That took 79 refusals over 39 files to 188 over 56, and the swarm has since brought it to 123 over 40. It still sees only `*.command.code.ts`, so a shared reader outside the tree it serves stays invisible, as `parse-args` is to `seat-system`. `experimental: true` means it binds nobody.\n",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "195 of 235 reach the generated keyed type at `b9d19e753bc`, 185 calling `takenFor` and 10 through `inventory-rule-calling`. 23 of 29 namespaces are whole; 27 of the 40 left are temper. No command names `Taken`, and only `change show` and `change apply` reach a key by element access, neither on the command line. Held on purpose: `alan tracking` on two frozen modules, `change apply` and `change draft` on the runs list their refusal names, `seat start` on the handshake Alan's `sr` reads.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "30 spellings are carried by more than one argument page at `b365d4a17ab`, down from 37 at `e659f26d471`: `--to` by six, `--query` by five, `--file-path`, `--all` and `--from` by four, then 19 pairs. No command names two alike, so no call is ambiguous. Each page was minted for one meaning with the contested spelling kept, which claims nothing and changes nothing a caller types. Alan's: does one argument having one spelling rename these 30?\n",
    },
  ],
} as const satisfies Initiative
