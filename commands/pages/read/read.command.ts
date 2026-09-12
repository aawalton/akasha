import type { Command } from "akasha/commands/command.page-type.types.ts"

export const read = {
  id: "01a04bec-10b4-7e86-aeae-ed252396f186",
  type: "command",
  slug: "read",
  definition:
    "the command returning each akasha file it is named, whole or as what changed since the agent read it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: ["module/differing", "module/output-reaching", "module/body-owing"],
  taking: [{ said: "--full", takes: "the whole body, whatever your record holds" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "`--file-path` is named again for each file read.",
    },
    {
      invariantKind: "departure",
      statement: "A read returns the whole file or the difference after the agent read the file.",
    },
    {
      invariantKind: "departure",
      statement: "A read of a body the agent read already says so.",
    },
    {
      invariantKind: "departure",
      statement: "A body the agent's record already has comes back as one line saying so.",
    },
    {
      invariantKind: "departure",
      statement:
        "The difference comes back only where the difference is shorter than the whole file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The difference is worked out against the body the record names and against no other body.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the body the agent read cannot be found again the whole file comes back and one line says why.",
    },
    {
      invariantKind: "departure",
      statement: "`--full` returns the body whatever the record has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read of a body that is not UTF-8 text returns a description of the body instead of the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body that would not open is refused with why that body would not.",
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
      statement: "A body past the bytes one answer has comes back a run of lines at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A run of lines begins after the line the record has as read.",
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
      statement: "No call returns a body past the bytes one answer has.",
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
      statement: "The call for the rest is priced as that call is printed.",
    },
    {
      invariantKind: "departure",
      statement: "The call for the rest of a read naming no file is that read again.",
    },
    {
      invariantKind: "departure",
      statement: "A read records the body that reached the agent that read was for.",
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
      statement: "A read naming no file reads the calling agent's own seat page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's own seat page is the page of the seat above that subagent.",
    },
    {
      invariantKind: "departure",
      statement: "An agent that has no seat page is refused with that as the reason.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal says the agent was identified and the seat was not found.",
    },
    {
      invariantKind: "departure",
      statement: "A read naming no file hands back the files that seat page warrants.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant reaches a read only where that warrant says that warrant runs on a read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file a warrant names is asked for files that file warrants only where the warrant is transitive.",
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
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A read naming a file that is not there is a fault of the input.",
    },
    {
      invariantKind: "departure",
      statement: "A read of a body that would not open is an operational fault.",
    },
    {
      invariantKind: "absence",
      statement: "A read naming a file hands back that file and no file that file warrants.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file left over whose body the record already holds is neither counted nor named.",
    },
  ],
  name: "read",
  arguments: [{ argument: "argument/file-path", repeats: true }, { argument: "argument/full" }],
  directives: [
    {
      directiveKind: "rule",
      name: "One Read A Call",
      act: "Run one `akasha read` per shell call rather than chaining several into one.",
      warrant:
        "Output past what one shell result has is truncated, and the record still says it reached you.",
      aids: [
        "One call naming many files is safe; it caps itself.",
        "The cap is per call, so chaining defeats it.",
        "Nothing marks what was lost.",
      ],
    },
  ],
} as const satisfies Command
