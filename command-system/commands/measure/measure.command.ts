import type { Command } from "../command.page-type.ts"

export const measure = {
  id: "01a05827-314f-7f41-8ff3-76792d3e7ad9",
  pageTypeSlug: "command",
  slug: "measure",
  definition: "the command saying what a fleet has spent of what it is allowed",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  partSlugs: ["module/claude-account-costing", "module/repo-measuring"],
  taking: [
    { said: "<subject>", takes: "what to measure, which is `claude-accounts` or `repo`" },
    { said: "cost", takes: "the act, which is to price the calls the transcripts here hold" },
  ],
  helpNotes: [
    "the subject is the first word, and one call measures one subject.",
    "an act is the second word, and a subject said with no act is measured whole.",
    "`cost` is the only act there is, and `claude-accounts` is the only subject carrying one.",
    "`claude-accounts` says what each account has spent of its five-hour and seven-day windows.",
    "each account's usage is read upstream first, and what is read lands beside that account.",
    "reading usage costs nothing and starts no window.",
    "renewing a token is the upkeep service's alone, so a lapsed account is passed over and named.",
    "the `>` names the account the picker would take right now.",
    "`cost` prices the calls the transcripts on this machine hold over the last thirty days.",
    "a price is the api's own list price, so what a subscription cost is not what `cost` says.",
    "a call a resumed session or a subagent wrote down again is counted once.",
    "the transcripts sit on this machine, so calls made on another machine are not counted.",
    "a model this holds no price for is named under the total rather than counted as nothing.",
    "`cost` reads every transcript, which takes minutes, and writes nothing while it runs.",
    "`repo` counts the files the checkout holds, which is every file now akasha is the root.",
    "`repo` counts what git counts: tracked files, and untracked files the repository keeps.",
    "what the repository ignores is not counted, so built output is no file waiting to arrive.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The subject is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "The act is the second word.",
    },
    {
      invariantKind: "departure",
      statement: "A subject stating no act is measured whole.",
    },
    {
      invariantKind: "departure",
      statement: "Only the claude-accounts subject carries an act.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subject this command does not measure is refused rather than measured as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An act this command does not carry is refused rather than measured as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet answered as holding nobody is the pages being wrong.",
    },
    {
      invariantKind: "departure",
      statement: "What a fleet has spent is read upstream before the fleet is answered.",
    },
    {
      invariantKind: "departure",
      statement: "An account that was not refreshed is named under the numbers.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account that was not refreshed is answered from what was already beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "What a call cost is what the api charges rather than what a subscription cost.",
    },
    {
      invariantKind: "absence",
      statement: "A run renews no token.",
    },
    {
      invariantKind: "absence",
      statement: "A run starts no rate-limit window.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit holds.",
    },
  ],
} as const satisfies Command
