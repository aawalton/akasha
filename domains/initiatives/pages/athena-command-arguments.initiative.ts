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
        "Six keys now: `argument`, `required`, `saidAs`, `notWith`, `repeats`, `oneOf`; `default` sits on the argument page. Of 74 pages naming every argument bare, 1 was understated — 73 agree with their code, and for the 34 reading through `takenFor` a gap cannot drift in, since the page is the enforcement. Two shapes no page can state: ordered pairing of `--file-path` with the `--content-file` after it, and a default one command has and another does not.\n",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "`takenFor` is the one reader. The check `command-takes-its-arguments-through-one-reader` is `experimental: true`, so it binds nobody; Alan approves a check before it binds, and the audit phase is off with it. Both its blind spots are mended, `3ae22245d60` and `5e4bd47f2e0`: it judges module code under `commands/pages` and follows a call one file on. That took it from 79 refusals over 39 files to 188 over 56, of which 107 name a reading written one file on.\n",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "101 of 235 command code files call `takenFor` and so get the generated keyed type; four more name `TakenFor` through `inventory-rule-calling`. The bag keyed by `string` has all but gone — `Taken` is named by no command file, and only `change-show` and `change-apply` reach a key by element access. The 130 left do not read a bag; they read argv words, themselves or through a per-domain reader. Measured at `b365d4a17ab`.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "30 spellings are carried by more than one argument page at `b365d4a17ab`, down from 37 at `e659f26d471`: `--to` by six, `--query` by five, `--file-path`, `--all` and `--from` by four, then 19 pairs. No command names two alike, so no call is ambiguous. Each page was minted for one meaning with the contested spelling kept, which claims nothing and changes nothing a caller types. Alan's: does one argument having one spelling rename these 30?\n",
    },
  ],
} as const satisfies Initiative
