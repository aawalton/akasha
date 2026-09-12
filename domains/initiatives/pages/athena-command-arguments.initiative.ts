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
        "`commands/arguments/argument.page-type.ts` is the page type: `said`, `takes`, `value`, `placeholder`, `repeats`. `Single Authority` settles the shape: one page per argument carrying one `takes` sentence, so the 44 wordings of `--json` across 64 command pages become one. The migration is running, largest argument first. Left for Alan: `--last`, `--to` and `--target` each spell two meanings, which is intent 7 and holds those commands back.",
    },
    {
      statement: "A command names the arguments it takes and narrows each.",
      workingMemory:
        "`command-arguments.record-property.ts` carries `required`, `saidAs` and `notWith` now — `68264b739a4`, `eed95dc9120`, `0af54f5a91f`. `select-property/said-as` has `flag`, `word`, `flag-or-word`, and a refusal names an argument the way its command takes it, which gives `placeholder` its first reader. Three commands state entries, and this waits on every argument becoming a page. Is a route flag a page of its own, or synthesized as `prose-routing` makes it?",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "`takingIn` at `commands/arguments/argument-taking/argument-taking.module.code.ts` is the one reader, proven by 29 tests. The question is settled: `calling` resolves a command's argument pages and hands the command what it read, since `command.page-type.ts` already binds `loadedBy: module/calling` and each command reaching the reader itself repeats the resolution 225 times. This waits on the migration off `taking`.",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "Nothing of this is built. `page-type.page-type.ts:88` states a type generator, which writes one file beside each page of the type stating it, so `command` stating one writes a type beside each of 225 command pages. `takingIn` answers a record keyed by each argument's slug in camel, which is what that type would narrow. Is a generated type file wanted beside every command page, or is the type read in TypeScript off the `arguments` the page already states?\n",
    },
    {
      statement: "A key piped into a command is one of that command's arguments.",
      workingMemory:
        "All 47 acts refuse an unknown key now, from one reader at `change-loading.module.code.ts:129-152` and one wording at `change-answer.module.code.ts:62-67` — `8c65a674d1f` through `179c0471d8d`. Eight refusals drawn live, all exit 1. `to` names nine kinds of thing across sixteen acts; `at` is the only key read against the repository root. Should a change act move onto the `commands/arguments/` mechanism, which already carries this refusal?",
    },
    {
      statement: "No command page states `taking`.",
      workingMemory:
        "224 of 236 command pages state `taking`, 790 entries in all. Its one reader moved to `commands/modules/help-writing/help-writing.module.code.ts:43,59,61`, plus three tests. `text-property/said` and `text-property/takes` do not go with it — both are now the argument page's own, under `page-type/argument`. `commands/properties/command-arguments.record-property.ts` is the replacement, stated by one command. This waits on every argument becoming a page.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "Every alias a command page declared is gone — sixteen landings, `7f192eb50ad` through `99d2e372171`, ending `--out`, `--in`, `-r`, `--aspect`, `--ref`, `--prompt` and `--output` across nine inference commands. `-r` was the only short form any command declared. Left: `--last` is a count at `measure-changes.command.ts:13` and true-or-false at `track-session-drop.command.ts:15`; `--to` names a recipient, a list position and a window end; `--target` names two. Which meaning keeps `--last`?",
    },
  ],
} as const satisfies Initiative
