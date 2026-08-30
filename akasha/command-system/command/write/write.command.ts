import type { Command } from "../command.page-type.ts"

export const write = {
  id: "01a04beb-8a78-7a92-89a8-7ff777fb51ff",
  pageTypeSlug: "command",
  slug: "write",
  definition: "whole file bodies carried in, gated together and landed or refused as one",
  code: "ts",
  test: "ts",
  mechanical: false,
  taking: [
    { said: "--file-path <path>", takes: "a path under `akasha/` to write" },
    { said: "--content-file <file>", takes: "the body that lands at the --file-path before it" },
    { said: "--remove <path>", takes: "a path under `akasha/` to take away" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
    { said: "--dry-run", takes: "say what would happen and write nothing" },
  ],
  helpNotes: [
    "--file-path and --content-file repeat in pairs, so several files land in one commit.",
    "a body is a file, never text said on the command line.",
    "the files standing beside a path given to --remove go with it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body reaches this only as a file named at `--content-file` rather than on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the akasha folder is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies written and the paths taken away by one call are one gated commit or none.",
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
      statement:
        "A path this call would change is warranted before anything is judged: the record must show its writer read the body standing there.",
    },
    {
      invariantKind: "departure",
      statement: "`--break-the-glass` passes the warrants as it passes the checks.",
    },
    {
      invariantKind: "departure",
      statement: "The reason it was broken stands in the commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path taken away carries the files standing beside it like `move` and `remove` do.",
    },
    {
      invariantKind: "departure",
      statement: "A page and the files it claims are taken away together or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "A file carried along beside a path taken away is not warranted.",
    },
    {
      invariantKind: "departure",
      statement: "What the caller warranted is the page claiming it.",
    },
    {
      invariantKind: "departure",
      statement: "A path named at `--remove` that stands at no body is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away is forgotten by the record for every agent.",
    },
    {
      invariantKind: "absence",
      statement: "`move` and `remove` warrant nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A path this call takes away was chosen by whoever called it.",
    },
    {
      invariantKind: "absence",
      statement: "A path this call takes away is warranted.",
    },
    {
      invariantKind: "gap",
      statement:
        "A caller hands in whole bodies and learns whether they were taken rather than half-taken.",
    },
  ],
} as const satisfies Command
