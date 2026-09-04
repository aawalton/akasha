import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandServer = {
  id: "01a06a05-bf7b-78ff-9bba-95684e31bba4",
  pageTypeSlug: "module",
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
      statement: "An ask names a command under the wire key `verb:`.",
    },
    {
      invariantKind: "constraint",
      statement: "The client declares the wire key `verb:`.",
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
      statement: "An answer carries the age of the server composing the answer.",
    },
    {
      invariantKind: "departure",
      statement: "An answer carries the pid composing the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A caller checks the lease bound a second time against the age an answer carries.",
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
      invariantKind: "absence",
      statement: "A command slow enough to make a panel wait behind the command is not served.",
    },
    {
      invariantKind: "departure",
      statement: "A command is served once the command's answer goes wholly through stdout.",
    },
    {
      invariantKind: "departure",
      statement: "A command served is an akasha command.",
    },
    {
      invariantKind: "departure",
      statement: "A command is reached by loading the command's file or through `calling`.",
    },
    {
      invariantKind: "constraint",
      statement: "A command reached through `calling` wants an index.",
    },
    {
      invariantKind: "constraint",
      statement: "A command reached by loading a file wants the file alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run is given the path of the command's own file as `argv[1]`.",
    },
    {
      invariantKind: "departure",
      statement: "That path is read from the commands folder rather than assembled from `tools`.",
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
      statement: "What is served and what the caller is told is served are named in two files.",
    },
    {
      invariantKind: "constraint",
      statement: "The names the caller reads hold no reach into `Bun`.",
    },
    {
      invariantKind: "constraint",
      statement: "The editor's node host imports those names.",
    },
    {
      invariantKind: "departure",
      statement: "The two lists are compared ahead of everything.",
    },
    {
      invariantKind: "departure",
      statement: "`--help` is answered after the two lists are compared.",
    },
    {
      invariantKind: "departure",
      statement: "A server finding the two lists apart answers nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A name served and not loadable is refused as unserved.",
    },
    {
      invariantKind: "departure",
      statement: "A name loadable and not served is spawned as a child by every poll.",
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
      statement: "Stdin closing is what happens when the caller dies.",
    },
  ],
} as const satisfies Module
