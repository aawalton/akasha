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
        "`commands/arguments/argument.page-type.ts` is the page type: `said`, `takes`, `value`, `placeholder`, `repeats`. `Single Authority` settles the shape: one page per argument carrying one `takes` sentence. 69 command pages name `--json`; 64 share one meaning and 5 keep their own on purpose. The migration runs largest argument first, one argument to a landing. Left for Alan: `--last`, `--to` and `--target` each spell two meanings, which is intent 7 and holds those commands back.",
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
        "`takenFor` at `argument-taking.module.code.ts:279` is the one reader, and the command reaches it rather than `calling`. The 225-times cost never existed: one process runs one command. `calling` resolves argument pages only to write help, behind the `--help` gate at `calling.module.code.ts:276`. Deciding it: a command page names an argument by slug, and only an import carries a slug to that page's type, so `calling` could only hand down `Record<string, Value>`. A check closes this.\n",
    },
    {
      statement:
        "A command's code reads its arguments through a type generated from its argument pages.",
      workingMemory:
        "`TakenFor` in `argument-taking.module.code.ts` reads a command page's `arguments` literal and answers exactly those keys, camelised, each typed by its argument page's `value`, with `required` deciding optionality (`66235ec888d6`). Proven on `git push` (`bfc3221fbcbc`) and `seat reset` (`750592bac7dc`), where reading a key the page does not name now draws `TS2339` at apply. Left: every other command's code still reads a bag keyed by `string`.\n",
    },
    {
      statement: "One spelling names one argument, and one argument has one spelling.",
      workingMemory:
        "Every alias is gone — `7f192eb50ad` through `99d2e372171`. Measured at `e659f26d471`: 37 spellings carry more than one `takes` sentence, about 25 of them genuinely more than one argument. `--query` names five things, `--from` four, `--file-path` four over 13 commands, `--message` a Gmail id and a commit message. No command names two arguments alike, so no call site is ambiguous. Five wait on Alan: `--last`, `--to`, `--target`, `--prompt` and `--text`.\n",
    },
  ],
} as const satisfies Initiative
