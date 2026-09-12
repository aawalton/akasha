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
        "338 argument pages, and 765 entries name exactly those 338 — no dangling reference, no page no command names. 216 of 235 command pages name arguments; 3 state `arguments: []` and 16 state no key at all, which are two different claims. Two commands read a flag no page names: `--break-the-glass` at `index-refresh.command.code.ts:35` and `--settings` at `seat-refresh-settings.command.code.ts:22`. The five Alan held all split by meaning.\n",
    },
    {
      statement: "A command names the arguments it takes and narrows each.",
      workingMemory:
        "The vocabulary is five keys on `command-arguments.record-property.ts`: `argument`, `required`, `saidAs`, `notWith`, `repeats`. `default` sits on the argument page instead. Of 216 pages naming arguments, 141 narrow and 75 do not, some where the code narrows — `track-weight.command.ts:58` names two bare while its invariants refuse a weight that is no number. The route question is answered: a route argument is a page ending `-file`, `c194ea764b8`, and 21 exist.\n",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "`takenFor` is the one reader. The check `command-takes-its-arguments-through-one-reader` landed at `43dbf523a33e` with `experimental: true`, so it binds nobody; Alan approves a check before it binds. It refused 47 of 235 command files at `b365d4a17ab`, 22 of them temper. The number it cannot see is 87 more handing argv to a per-domain reader — `temper/commands/argument-word-reading` holds 15, `inference/wan/wan-arguing` 8. Those fold before the check means what it says.\n",
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
