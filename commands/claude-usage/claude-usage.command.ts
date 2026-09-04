import type { Command } from "../../command-system/commands/command.page-type.ts"

export const claudeUsage = {
  id: "01a06934-eccc-7acc-a89a-a79d59b633d6",
  pageTypeSlug: "command",
  slug: "claude-usage",
  definition: "what the Claude fleet has spent of its two windows, as one JSON object",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "it prints one JSON object and nothing else, carrying a session mean and a weekly mean.",
    "a mean is a value and the count of accounts that value was taken over.",
    "`value` is the mean percentage spent across the accounts that carried a figure, and `over` is how many carried one.",
    "an account with no reading is left out of the mean rather than counted as having spent nothing.",
    "a checkout naming no claude-account is an error rather than a fleet that has spent nothing.",
    "zero across the board is a reading Alan would act on, and pages going unread is not.",
    "the editor's two usage slots ask this as a child, and that is the whole reason it exists.",
    "the fleet is read by `readFleetUsage`, which reaches `readingsIn`, which loads each account's page body.",
    "a page body is loaded with `Bun.Transpiler`, and only bun carries that.",
    "the extension host is node — Electron forks it as a utility process under its own node build — so there that reach throws.",
    "the status bar gathers its four reads with `Promise.allSettled`, so that throw was swallowed into a stale slot.",
    "both numbers then drew an em dash under a tooltip saying no successful poll yet, and nothing failed loudly.",
    "asking the fleet by hand under bun answers every account, which is why running it that way never showed it.",
    "it was measured by `panel-judging`, which runs the real activation under node and reads the slots back.",
    "the work tree and the page tree already ask their children for the same reason.",
    "it takes no word at all, so any word said to it is refused.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The fleet's spend is read from the checkout at the moment of asking.",
    },
    {
      invariantKind: "departure",
      statement: "A mean is taken over the accounts carrying a figure rather than over every one.",
    },
    {
      invariantKind: "departure",
      statement: "An account carrying no figure moves neither the mean nor the count beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout naming no claude-account throws rather than answering nothing spent.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet sitting idle and a checkout that will not answer are told apart.",
    },
    {
      invariantKind: "departure",
      statement: "An account's page body is loaded with `Bun.Transpiler`, which only bun carries.",
    },
    {
      invariantKind: "departure",
      statement: "The editor host is node, so it asks this as a child rather than reading itself.",
    },
    {
      invariantKind: "departure",
      statement: "It takes no word at all, so any word said to it is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says how a figure is drawn.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
} as const satisfies Command
