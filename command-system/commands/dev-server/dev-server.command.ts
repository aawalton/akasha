import type { Command } from "../command.page-type.ts"

export const devServer = {
  id: "01a06809-250b-78b0-b853-abd5d686eb05",
  pageTypeSlug: "command",
  slug: "dev-server",
  definition: "a React Router dev server run detached for one app in a branch's worktree",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "bootstrap",
      takes: "the act, which writes the app's `.env.local` from its sops secrets",
    },
    { said: "logs", takes: "the act, which is the tail of one server's captured output" },
    { said: "restart", takes: "the act, which stops one server and starts it again" },
    { said: "start", takes: "the act, which spawns a server and records where it stands" },
    { said: "status", takes: "the act, which reads whether a server is running or stopped" },
    { said: "stop", takes: "the act, which ends a server and takes the state file it held" },
    { said: "<seq>", takes: "the branch sequence number, said here where no flag names it" },
    {
      said: "--seq <n>",
      takes: "the branch sequence number naming the worktree, the state file and the log",
    },
    { said: "--app <name>", takes: "which app to act on, named as the app registry names it" },
    {
      said: "--port <p>",
      takes: "the port to run on, standing in for the one the base port and the seq work out",
    },
    { said: "--tail <n>", takes: "how many trailing lines of the log to answer with" },
    { said: "--force", takes: "write an `.env.local` over one already standing" },
    { said: "--all", takes: "every server a state file tracks, which a stop alone reaches" },
    { said: "--json", takes: "answer as one JSON line rather than as lines a reader takes" },
  ],
  helpNotes: [
    "the act is the first word, and a seq may follow it as a word where no `--seq` names one.",
    "a start refuses a server already running rather than replacing it, and a restart is how one is replaced.",
    "a start writes the app's `.env.local` from its sops secrets where none stands, and leaves one that does.",
    "a stop names one server by its seq and its app, or every tracked server with `--all`, and never both.",
    "a stop already stopped is answered as stopped, and the stale state file it left is taken.",
    "a state file naming a process that is gone reads as stopped, and a status takes no state file away.",
    "`WORKTREE_DIR` names the worktree outright, and the seq still names the state file and the log.",
    "a log is answered as the log stood when the answer was built.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A seq said as a word stands only where no flag names one.",
    },
    {
      invariantKind: "departure",
      statement: "A start refuses a server already running rather than replacing it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A start writes the app's `.env.local` from its sops secrets only where none stands.",
    },
    {
      invariantKind: "departure",
      statement: "A stop names one server or every server tracked, never both.",
    },
    {
      invariantKind: "departure",
      statement: "A stop sends SIGTERM, waits for the process to go, then sends SIGKILL.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stop already stopped is answered as stopped and the state file it left is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A state file naming a process that is gone reads as stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A status takes no state file away and writes none.",
    },
    {
      invariantKind: "departure",
      statement: "A restart answers with what its start answered and nothing of its stop.",
    },
    {
      invariantKind: "departure",
      statement: "The port is the app's base port against the seq where no port is named.",
    },
    {
      invariantKind: "departure",
      statement: "The worktree the seq names is the one `WORKTREE_DIR` states where it states one.",
    },
    {
      invariantKind: "departure",
      statement: "A log is answered as the log stood when the answer was built.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here follows a log as the log grows.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes over an `.env.local` that stands unless it is told to.",
    },
  ],
} as const satisfies Command
