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
        "`taking.record-property.ts:34` says a command taking its arguments piped in states nothing here, so the keys `akasha change draft` reads are written on no page. A caller learns them from a refusal: drafting `rename-page` with `slug` was answered by `to` names what this change is handed. Each act carries its own — `at`, `old`, `new`, `key`, `record`, `where`, `is`, `of`, `to`. Only the way the words arrive differs.\n",
    },
    {
      statement: "No command page states `taking`.",
      workingMemory:
        "`taking` is a display list and nothing else: `helpOf` at `calling.module.code.ts:237-239` is its one reader. Once an argument is a page, help is drawn from the arguments a command names, and this goes with the two text properties it holds — `record-property/taking`, `text-property/said`, `text-property/takes`, all named at `command.page-type.ts:14,17,18`.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "`slug.text-property.ts:11` makes a slug unique within its page type, which does not bind an argument's spelling. Both halves are broken: `--last` is a count at `measure-changes.command.ts:14,16` and true-or-false at `track-session-drop.command.ts:16`; `at` is a wall-clock time in six `track session` commands and a file destination at `browser-test-storage-state.command.ts:19`. The file to act on is `--file-path`, `--file` and `--path`; the checkout is `--code-root` and `--repo-root`.\n",
    },
  ],
} as const satisfies Initiative
