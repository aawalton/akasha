import type { Command } from "../command.page-type.ts"

export const write = {
  id: "01a04beb-8a78-7a92-89a8-7ff777fb51ff",
  pageTypeSlug: "command",
  slug: "write",
  definition: "whole file bodies carried in, gated together and landed or refused as one",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKindSlug: "change-authored",
  taking: [
    { said: "--file-path <path>", takes: "a path anywhere in the repository to write" },
    { said: "--content-file <file>", takes: "the body that lands at the --file-path before it" },
    { said: "--remove <path>", takes: "a path in the repository to take away" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
    { said: "--draft", takes: "keep what would land in this agent's patch rather than landing it" },
  ],
  helpNotes: [
    "--file-path and --content-file repeat in pairs, so several files land in one commit.",
    "a body is a file or standard input, never text said on the command line.",
    "a --file-path naming no --content-file reads that body from standard input.",
    "pipe the body in with a quoted heredoc: --message <text> <<'EOF', the body, then EOF.",
    "a folder at the top of the repository is refused — name what is inside it.",
    "the files standing beside a path given to --remove go with it.",
    "a folder left holding nothing by what --remove takes is cleared off the disk.",
    "--draft gates the change as a landing does, then keeps it in the patch beside this agent's page.",
    "a drafted change is rebased onto HEAD every time the patch is drafted into again.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body reaches this command at `--content-file` or on standard input rather than the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A path anywhere in the repository is written.",
    },
    {
      invariantKind: "departure",
      statement: "A path inside `.git` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder at the top of the repository is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path no check judged is named in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A path named at `--remove` is inside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "What a call said is read here.",
    },
    {
      invariantKind: "departure",
      statement: "What a call asked for is landed by `asking`.",
    },
    {
      invariantKind: "departure",
      statement: "A path this call would change is warranted before anything is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A change kind running no warrant warrants nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The seat this call is charged to is warranted alongside them.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the seat owes and what the paths owe are ordered together rather than said as two lists.",
    },
    {
      invariantKind: "departure",
      statement: "An agent that has not read what the agent is changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The record must show a path's writer read the body standing there.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--break-the-glass` passes the warrants as `--break-the-glass` passes the checks.",
    },
    {
      invariantKind: "departure",
      statement: "The reason the glass was broken stands in the commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path taken away carries the files standing beside the path like `move` and `remove` do.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file beside a path taken away goes with it whether or not git tracks that file.",
    },
    {
      invariantKind: "departure",
      statement: "A file carried along beside a path taken away is not warranted.",
    },
    {
      invariantKind: "departure",
      statement: "What the caller warranted is the page claiming the path.",
    },
    {
      invariantKind: "departure",
      statement: "A path named at `--remove` the base commit misses and no disk holds is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path named at `--remove` that git does not track is taken off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away is forgotten by the record for every agent.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left holding nothing by a path taken away is cleared off the disk.",
    },
    {
      invariantKind: "absence",
      statement: "`move` and `remove` warrant nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A path this call takes away was chosen by whoever called this call.",
    },
    {
      invariantKind: "absence",
      statement: "A path this call takes away is warranted.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming `--draft` keeps a patch rather than writing a body onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A path drafted is warranted as a path landed is.",
    },
    {
      invariantKind: "departure",
      statement: "A path drafted away is forgotten by the record for nobody.",
    },
    {
      invariantKind: "gap",
      statement:
        "A caller hands in whole bodies and learns whether the bodies were taken rather than half-taken.",
    },
  ],
} as const satisfies Command
