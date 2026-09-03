import type { Command } from "@akasha/command-system/command"

export const inferenceVideoQa = {
  id: "01a0685e-fd50-7d17-9486-a30db6114780",
  pageTypeSlug: "command",
  slug: "inference-video-qa",
  definition: "the command answering a question about a clip from the frames taken out of it",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--video <path>", takes: "the clip read, whose frames are taken here" },
    { said: "--frames-dir <dir>", takes: "frames already taken out, read instead of a clip" },
    { said: "--checklist <text>", takes: "what the model is asked to look for" },
    {
      said: "--checklist-file <path>",
      takes: "that question read from a path, or `-` for standard input",
    },
    { said: "--frames <n>", takes: "how many frames are sampled out of the ones there are" },
    { said: "--fps <n>", takes: "the rate the clip is resampled to before frames are sampled" },
    { said: "--timeout <s>", takes: "how many seconds the wait on the model runs for" },
  ],
  helpNotes: [
    "a clip or a directory of frames is named, never both and never neither.",
    "the frames sampled are spread evenly across the ones there are rather than taken from the front.",
    "a rate nothing named leaves every frame in place before sampling.",
    "the answer is what the model said, and it is the run row's output as well.",
    "a run row is filed whether the reading finished or failed.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clip or a directory of frames is named, never both and never neither.",
    },
    {
      invariantKind: "departure",
      statement: "The frames sampled are spread evenly across the ones there are.",
    },
    {
      invariantKind: "departure",
      statement: "A directory holding no frame is a fault rather than an empty answer.",
    },
    {
      invariantKind: "departure",
      statement: "Frames taken here are taken into a temporary place and cleared afterwards.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is what the model said.",
    },
    {
      invariantKind: "departure",
      statement: "A run row is filed whether the reading finished or failed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a clip or a frame the caller keeps.",
    },
  ],
} as const satisfies Command
