import type { Command } from "../../command-system/commands/command.page-type.ts"

export const read = {
  id: "01a04bec-10b4-7e86-aeae-ed252396f186",
  pageTypeSlug: "command",
  slug: "read",
  definition:
    "the command returning each akasha file it is named, whole or as what changed since the agent read it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKindSlug: "change-none",
  partSlugs: ["module/long-body"],
  taking: [
    { said: "--file-path <path>", takes: "a file in the repository to read" },
    { said: "--full", takes: "the whole body, whatever your record holds" },
  ],
  helpNotes: [
    "--file-path repeats, so several files come back from one call.",
    "a read also hands back what the files you name warrant, so one call answers the gate.",
    "a body your record already holds comes back as one line rather than the file.",
    "a body that moved since your record holds it comes back as what changed, where that is shorter.",
    "a read takes no line range, and one answer holds 28000 bytes.",
    "a body longer than that comes back a run of lines at a time, and the same call takes the next run.",
    "a body read in part answers no write until the whole of it has reached you.",
    "a path is read against the repository root, wherever the call was made.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A read returns the whole file or what changed after the agent read the file.",
    },
    {
      invariantKind: "departure",
      statement: "A read of a body the agent read already says so.",
    },
    {
      invariantKind: "departure",
      statement: "A body the agent's record already holds comes back as one line saying so.",
    },
    {
      invariantKind: "departure",
      statement: "What changed comes back only where it is shorter than the whole file.",
    },
    {
      invariantKind: "departure",
      statement:
        "What changed is worked out against the body the record names and against no other.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the body the agent read cannot be found again the whole file comes back and one line says why.",
    },
    {
      invariantKind: "departure",
      statement: "`--full` returns the body whatever the record holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read of a body that is not UTF-8 text returns what the body is instead of the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body that would not open is refused with why it would not.",
    },
    {
      invariantKind: "absence",
      statement: "A read takes no line range.",
    },
    {
      invariantKind: "departure",
      statement: "A read too big for one answer returns fewer files and how to ask for the rest.",
    },
    {
      invariantKind: "departure",
      statement: "A body past what one answer holds comes back a run of lines at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A run of lines begins after the line the record holds as read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run of lines short of the last line says nothing past that line reached the reader.",
    },
    {
      invariantKind: "departure",
      statement: "A run of lines short of the last line is recorded as how far the body reached.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaching its last line is recorded as a body read whole.",
    },
    {
      invariantKind: "departure",
      statement: "A body recorded as read in part is a body no record shows the agent read.",
    },
    {
      invariantKind: "departure",
      statement: "A body read in part whose bytes moved is begun again at its first line.",
    },
    {
      invariantKind: "departure",
      statement: "A body longer than one answer holds comes back alone.",
    },
    {
      invariantKind: "departure",
      statement: "A line no answer has room for is refused rather than divided.",
    },
    {
      invariantKind: "departure",
      statement: "No call returns a body past what one answer holds.",
    },
    {
      invariantKind: "departure",
      statement: "A read reaches no file outside this repository.",
    },
    {
      invariantKind: "departure",
      statement: "The line numbers a read prints are not part of the file.",
    },
    {
      invariantKind: "departure",
      statement: "The call for what is left over is priced as that call is printed.",
    },
    {
      invariantKind: "departure",
      statement: "A read records the body that reached the agent it was for.",
    },
    {
      invariantKind: "departure",
      statement: "A read whose output is thrown away returns nothing and records nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A read for an agent nothing identifies is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A read hands back what the file the read names warrants.",
    },
    {
      invariantKind: "departure",
      statement: "A warrant reaches a read only where it says it runs on one.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a warrant names is asked what the named file warrants only where the warrant is transitive.",
    },
    {
      invariantKind: "departure",
      statement: "A file the read reaches by two ways is one file in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A file a warrant names comes back after the file that warranted the named file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read the warrants cannot be worked out for returns the files the read was named.",
    },
  ],
} as const satisfies Command
