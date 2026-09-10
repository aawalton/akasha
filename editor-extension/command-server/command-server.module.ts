import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandServer = {
  id: "01a06a05-bf7b-78ff-9bba-95684e31bba4",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-server",
  definition: "one bun runtime held open, answering commands over a pipe against no startup cost",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A caller in node pays bun's startup for each command asked as a child.",
    },
    {
      invariantKind: "constraint",
      statement: "Bun's startup is about a fifth of a second.",
    },
    {
      invariantKind: "constraint",
      statement: "A command's own work is measured in milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "This server is spawned as a program rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "An ask arrives on stdin.",
    },
    {
      invariantKind: "departure",
      statement: "An answer goes out on fd 3.",
    },
    {
      invariantKind: "departure",
      statement: "A command writes the command's own answer to stdout.",
    },
    {
      invariantKind: "departure",
      statement: "The protocol therefore has a stream of the protocol's own.",
    },
    {
      invariantKind: "departure",
      statement: "A byte escaping onto stdout is the caller's to log rather than an answer.",
    },
    {
      invariantKind: "departure",
      statement: "The first line on fd 3 is hello.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is asked before hello.",
    },
    {
      invariantKind: "departure",
      statement: "An ask names a module under `module:` and an export under `export:`.",
    },
    {
      invariantKind: "constraint",
      statement: "The client declares both wire keys.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is remembered between one ask and the next.",
    },
    {
      invariantKind: "departure",
      statement: "An ask re-runs a command against the files as the files are when asked.",
    },
    {
      invariantKind: "departure",
      statement: "A run is wrapped in one call.",
    },
    {
      invariantKind: "departure",
      statement: "The per-call memos are therefore as new as the memos in a child just started.",
    },
    {
      invariantKind: "constraint",
      statement: "A held-open runtime cannot make fresh the code the runtime loaded.",
    },
    {
      invariantKind: "departure",
      statement: "This server therefore refuses to live.",
    },
    {
      invariantKind: "departure",
      statement: "A server past a lease answers nothing and exits.",
    },
    {
      invariantKind: "departure",
      statement: "A server finishing stays for the goodbye, so what it last said is read first.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller reads an exit before a pipe where the two arrive together.",
    },
    {
      invariantKind: "departure",
      statement: "A lease is spent on the next ask rather than by a clock killing the process.",
    },
    {
      invariantKind: "departure",
      statement: "The ask spending a lease is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A caller reading a lease refusal starts another server.",
    },
    {
      invariantKind: "departure",
      statement: "The one path a lease turnover takes is therefore the one path a test walks.",
    },
    {
      invariantKind: "departure",
      statement: "An answer has the age of the server composing the answer.",
    },
    {
      invariantKind: "departure",
      statement: "An answer has the pid composing the answer.",
    },
    {
      invariantKind: "departure",
      statement: "An idle bound reaps a server whose caller stopped asking without closing stdin.",
    },
    {
      invariantKind: "departure",
      statement: "An idle bound is above the lease.",
    },
    {
      invariantKind: "constraint",
      statement: "An idle bound below the lease would reap a server before a lease turned over.",
    },
    {
      invariantKind: "departure",
      statement: "The server runs commands in series.",
    },
    {
      invariantKind: "constraint",
      statement: "Capturing stdout means replacing stdout for the length of a run.",
    },
    {
      invariantKind: "departure",
      statement: "A command is loaded when first asked for rather than at startup.",
    },
    {
      invariantKind: "departure",
      statement: "A command whose imports throw refuses only the asks for that command.",
    },
    {
      invariantKind: "departure",
      statement: "An export answers through stdout, and what it wrote there is the answer.",
    },
    {
      invariantKind: "departure",
      statement: "An export takes the arguments and the call, and answers a report and a code.",
    },
    {
      invariantKind: "departure",
      statement: "The file an export sits in is the code beside the page the ask names.",
    },
    {
      invariantKind: "constraint",
      statement: "That page is looked for among the modules and then among the commands.",
    },
    {
      invariantKind: "departure",
      statement: "The page is answered from the index rather than assembled from a name.",
    },
    {
      invariantKind: "departure",
      statement: "The index read is the checkout this server's own file sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The repository a call works on is the one the environment names.",
    },
    {
      invariantKind: "departure",
      statement: "A run is given the path of the file the export sits in as `argv[1]`.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is said the way a command says an answer.",
    },
    {
      invariantKind: "departure",
      statement: "The caller's short-read guard therefore keeps working.",
    },
    {
      invariantKind: "constraint",
      statement: "The protocol the caller reads has no reach into `Bun`.",
    },
    {
      invariantKind: "constraint",
      statement: "The editor's node host imports it.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no page carries is refused as unserved.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose code holds no such export is refused as unserved.",
    },
    {
      invariantKind: "absence",
      statement: "No caller of this server spawns a child of its own.",
    },
    {
      invariantKind: "constraint",
      statement: "A partial write is ordinary on a pipe rather than a fault.",
    },
    {
      invariantKind: "departure",
      statement: "Saying a line means saying the whole line.",
    },
    {
      invariantKind: "departure",
      statement: "The server's own voice is fd 2 written straight.",
    },
    {
      invariantKind: "constraint",
      statement: "A run has replaced `process.stderr.write` for as long as the run lasts.",
    },
    {
      invariantKind: "departure",
      statement: "A server exits when stdin closes.",
    },
    {
      invariantKind: "constraint",
      statement: "Stdin closes when the caller dies.",
    },
    {
      invariantKind: "departure",
      statement: "A command that throws while running is refused by name rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A lease once spent stays spent for every ask after it.",
    },
    {
      invariantKind: "departure",
      statement: "An idle bound counts from the last answer rather than from the last ask.",
    },
  ],
} as const satisfies Module
