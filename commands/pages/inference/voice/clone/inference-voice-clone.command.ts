import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceVoiceClone = {
  id: "01a0685e-fd50-7b15-b3e5-0d3469cc2a28",
  type: "command",
  slug: "inference-voice-clone",
  definition: "the command speaking text in the voice a reference clip carries",
  code: "ts",
  taking: [
    { said: "--text <utterance>", takes: "what is spoken in the cloned voice" },
    { said: "--text-file <path>", takes: "that text read from a path, or `-` for standard input" },
    { said: "--ref-audio <path.wav>", takes: "the clip the voice is taken from" },
    { said: "--ref-text <transcript>", takes: "what that clip says" },
    {
      said: "--ref-text-file <path>",
      takes: "that transcript read from a path, or `-` for standard input",
    },
    { said: "--priority <lane>", takes: "which lane of the traffic cop the request waits in" },
    {
      said: "--mode <how>",
      takes: "whether the clip is the voice to match or a tail to carry on from",
    },
    { said: "--no-persist", takes: "leave the audio where it was written and file no page for it" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clip named without its transcript is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A clip named is carried to the host before the request is made.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no clip uses the clip the host was provisioned with.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is no RIFF payload is a fault rather than a file written.",
    },
    {
      invariantKind: "departure",
      statement: "The audio is written where the caller named that audio and nowhere else.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here cuts the text into pieces.",
    },
  ],
  name: "clone",
  arguments: [{ argument: "argument/output" }, { argument: "argument/timeout" }],
} as const satisfies Command
