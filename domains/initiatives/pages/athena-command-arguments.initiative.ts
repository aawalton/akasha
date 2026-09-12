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
        "338 argument pages and 766 entries at `2422666aa8c` name exactly those 338. Two flags reach `alan tracking` that no page names, both out of shared `file-arguing`: `--break-the-glass`, refused by name at its code `:54` yet still in the take-list `akasha alan tracking --nope` prints; and `--restated`, admitted, which swaps the kind to `change-restated`, whose page owes the writer a reading, making `alan-tracking.command.ts:44` false. Its `:15` is true — `landingTracked` passes no kind. Alan's.\n",
    },
    {
      statement: "A command names the arguments it takes and narrows each.",
      workingMemory:
        "Naming holds; narrowing does not. Only `value` narrows, and 250 of 338 pages carry `text` or `path`, which both fall through to the raw string. Two splits are Alan's. `oneOf` says at least one for 6 groups and exactly one for 17, and until a page says which, no type narrows a group. `path` names two policies: `--file-path` must stay in the repository and `--output` writes outside it, so no one resolver fits and the rule that a path is read against the root must never be true of `--output`.\n",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "`takenFor` is the one reader, and the check's three blind spots are mended: module code under `commands/pages`, a call followed one file on, a dynamic `await import()`. It refused 97 over 37 files at the mend and 45 over 13 at `b54caedd669a`; counts move hourly. One reader is outside: `parse-args`, whose last caller is Alan's `sr`, which runs the resume module for a handshake and a `--no-launch` the page rightly refuses to name. Alan's: retiring it changes what `sr` runs.\n",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "229 of 236 at `1865d6a7de3`, taken from the check's silence rather than a grep: 210 name `takenFor`, 19 reach it through `esoAnswering` or `answeredByPage`, 7 are refused. Four `temper/inventory` holdouts are unconverted hand loops held by nothing. Three have reasons: `change apply` and `change draft` because `takingIn` swallows a bare `--`, and `alan tracking` because `file-arguing` reads by word order while `takenFor` drops each word's place.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "30 spellings are carried by more than one argument page at `b365d4a17ab`, down from 37 at `e659f26d471`: `--to` by six, `--query` by five, `--file-path`, `--all` and `--from` by four, then 19 pairs. No command names two alike, so no call is ambiguous. Each page was minted for one meaning with the contested spelling kept, which claims nothing and changes nothing a caller types. Alan's: does one argument having one spelling rename these 30?\n",
    },
  ],
} as const satisfies Initiative
