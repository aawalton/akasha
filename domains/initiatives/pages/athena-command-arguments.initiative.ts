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
      statement: "A command does not have a change kind.",
      workingMemory:
        "`commands/command.page-type.ts:127` requires it and 225 command pages state it. `calling.module.code.ts:306,316` seeds `given.changeKind` off the page; only `warrant-owing.module.code.ts:10` and `file-arguing.module.code.ts:78` read it, and `restatedIn` at `:56` overwrites it from `--restated`, so the kind is the change's. `change-running.module.code.ts:377` already reads it off the change agent. `commands/properties/change-kind.relation-property.ts` belongs under `changes/`.\n",
    },
    {
      statement: "Every argument a command takes is a page.",
      workingMemory:
        "One page is one argument concept, shared: `--dry-run` written once and named by every command taking it, as a page property is by every page type. The shape a page states is the union three parsers carry already — `Shape` at `inventory-rule-calling.module.code.ts:60-67`, `Taking` at `email-command-reading.module.code.ts:49-57`, and the reader at `index-refresh.command.code.ts:30-54`: value or none, placeholder, repeats, number, true or false, path, sibling, positional, exclusive.\n",
    },
    {
      statement: "A command names the arguments it takes and narrows each.",
      workingMemory:
        "Required belongs to the command rather than the argument: `--subject` is needed by a send and by nothing else, at `email-command-reading.module.code.ts:73`. Repeating belongs to the argument. `properties.one-of-property.ts:15-40` already has a page type declare what it adds and narrow what it inherits, optional becoming required, and the type generator runs off that shape. A command's declaration of an argument narrows it the same way.\n",
    },
    {
      statement:
        "One reader reads every command's arguments from the pages, refusing what no page names.",
      workingMemory:
        "Three readers run today — `readIn` at `inventory-rule-calling.module.code.ts:164`, `readTaking` at `email-command-reading.module.code.ts:93`, and the hand-written one at `index-refresh.command.code.ts:30` — each refusing an unknown flag in its own words. `inventory-rule-calling.module.ts:24` already states that a command names the act to run and states nothing of how a call is read; that becomes true of every command rather than of the twenty-five under it.\n",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "`page-type.page-type.ts:88` states a type generator, and `types.file-property.ts:16-24` has a page type's type written beside it rather than by hand. A command gets the same: the keys its reader answers are the arguments its pages declare, so naming one no page declares will not compile. This is what makes a check comparing page against code unnecessary — the disagreement cannot be written, rather than being caught after it is.\n",
    },
    {
      statement: "A key piped into a command is one of that command's arguments.",
      workingMemory:
        "Each of the 47 acts reads its keys from `const`s in its own `changes/agent/**/*.change-agent.code.ts`, and no module names them. A key is required where its read is guarded by a `missing` refusal. `untaken` at `change-answer.module.code.ts:61` is reached by 2 acts, so a misspelled key is silent in the other 45. `to` is overloaded eight ways, and only `at` is read against the repository root. Do these keys wait on the argument-page design?\n",
    },
    {
      statement: "No command page states `taking`.",
      workingMemory:
        "`taking` is a display list and nothing else: `helpOf` at `calling.module.code.ts:237-239` is its one reader. Once an argument is a page, help is drawn from the arguments a command names, and this goes with the two text properties it holds — `record-property/taking`, `text-property/said`, `text-property/takes`, all named at `command.page-type.ts:14,17,18`.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "`--code-root`, `--file-path` and `--at` each name one argument now, and `--path` only the path under an origin. Left: `--last` is a count at `measure-changes.command.ts:13` and true-or-false at `track-session-drop.command.ts:15`; `--to` names a recipient, a list position and a window end; `--target` names two things. Seven pages declare an alias to drop, and `--out` and `--output` are one meaning twice. Which meaning keeps `--last`?\n",
    },
  ],
} as const satisfies Initiative
