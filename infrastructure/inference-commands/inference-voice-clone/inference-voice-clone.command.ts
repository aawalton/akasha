import type { Command } from "@akasha/command-system/command"

export const inferenceVoiceClone = {
  id: "01a0685e-fd50-7b15-b3e5-0d3469cc2a28",
  pageTypeSlug: "command",
  slug: "inference-voice-clone",
  definition: "the command speaking text in the voice a reference clip carries",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--text <utterance>", takes: "what is spoken in the cloned voice" },
    { said: "--text-file <path>", takes: "that text read from a path, or `-` for standard input" },
    { said: "--ref-audio <path.wav>", takes: "the clip the voice is taken from" },
    { said: "--ref-text <transcript>", takes: "what that clip says" },
    {
      said: "--ref-text-file <path>",
      takes: "that transcript read from a path, or `-` for standard input",
    },
    { said: "--output <path.wav>", takes: "where the WAV is written" },
    { said: "--priority <lane>", takes: "which lane of the traffic cop the request waits in" },
    { said: "--timeout <s>", takes: "how many seconds the wait on the pool runs for" },
    {
      said: "--mode <how>",
      takes: "whether the clip is the voice to match or a tail to carry on from",
    },
    { said: "--no-persist", takes: "leave the audio where it was written and file no page for it" },
  ],
  helpNotes: [
    "a clip named is carried to the host, and a call naming none uses the one the host was provisioned with.",
    "a clip named is refused without its transcript, because the model reads the clip against what it says.",
    "the high lane drains ahead of queued batch work without cutting into what is already running.",
    "the text is not cut into pieces, so a few sentences is what this is for.",
    "the timeout absorbs a cold load of about nine minutes as well as the queue wait.",
    "a run row is filed whether the speaking finished or failed.",
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
      statement: "A call naming no clip uses the one the host was provisioned with.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is no RIFF payload is a fault rather than a file written.",
    },
    {
      invariantKind: "departure",
      statement: "The audio is written where the caller named it and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the speaking finished or failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here cuts the text into pieces.",
    },
  ],
} as const satisfies Command
