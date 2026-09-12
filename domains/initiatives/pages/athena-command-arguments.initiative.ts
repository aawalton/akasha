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
        "`commands/arguments/argument.page-type.ts` is the page type: `said`, `takes`, `value` of none, text, whole-number, true-or-false or path, `placeholder`, `repeats`. `argument/dry-run` is its one page, named by `akasha index refresh`. 322 argument concepts are still spelled in 225 command pages. `--json` is named by 64 of them with 44 different `takes` sentences, `--force` by 12 with 8. Does one shared page carry one sentence, or does a command restate what its argument is for?\n",
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
        "`takingIn` at `commands/arguments/argument-taking/argument-taking.module.code.ts` is the one reader, proven by 15 tests, and nothing calls it. The three readers it replaces still run: `readIn` at `inventory-rule-calling.module.code.ts:164`, `readTaking` at `email-command-reading.module.code.ts:93`, `readIn` at `index-refresh.command.code.ts:32`. Does `calling` resolve a command's argument pages and hand the command what it read, or does each command reach the reader itself?\n",
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
        "Each of the 47 acts reads its keys from `const`s in its own `changes/agent/**/*.change-agent.code.ts`, and no module names them. A key is required where its read is guarded by a `missing` refusal. `untaken` at `change-answer.module.code.ts:61` is reached by 2 acts, so a misspelled key is silent in the other 45. `to` is overloaded eight ways, and only `at` is read against the repository root. Do these keys wait on the argument-page design?\n",
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
