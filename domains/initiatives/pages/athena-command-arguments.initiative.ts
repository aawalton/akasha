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
        "Six keys: `argument`, `required`, `saidAs`, `notWith`, `repeats`, `oneOf`; `default` sits on the argument page. Of 74 pages naming every argument bare, 1 was understated, and where a page feeds `takenFor` a gap cannot drift in, since the page is the enforcement. Three shapes no page states, all Alan's: ordered pairing of `--file-path` with the `--content-file` after it; a default one command has and another does not; an argument refused rather than taken, as `read --seat` is.\n",
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
        "169 of 235 command code files call `takenFor` at `02e0a5d5a58`, up from 101, and the bag keyed by `string` has all but gone. Most of what is left is namespaces still being worked; three are held on purpose. `alan tracking` waits on two frozen modules. `change apply` and `change draft` share `changing()`, whose refusal names every change there is, and that discovery path stays. `seat start` shares `parse-args` with `seat resume`, which Alan's `sr` reads two tab-separated fields out of.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "30 spellings are carried by more than one argument page at `b365d4a17ab`, down from 37 at `e659f26d471`: `--to` by six, `--query` by five, `--file-path`, `--all` and `--from` by four, then 19 pairs. No command names two alike, so no call is ambiguous. Each page was minted for one meaning with the contested spelling kept, which claims nothing and changes nothing a caller types. Alan's: does one argument having one spelling rename these 30?\n",
    },
  ],
} as const satisfies Initiative
