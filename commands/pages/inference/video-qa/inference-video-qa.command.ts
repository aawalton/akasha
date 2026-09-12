import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceVideoQa = {
  id: "01a0685e-fd50-7d17-9486-a30db6114780",
  type: "command",
  slug: "inference-video-qa",
  definition: "the command answering a question about a clip from the frames taken out of it",
  code: "ts",
  taking: [
    { said: "--video <path>", takes: "the clip read, whose frames are taken here" },
    { said: "--frames-dir <dir>", takes: "frames already taken out, read instead of a clip" },
    { said: "--checklist <text>", takes: "what the model is asked to look for" },
    {
      said: "--checklist-file <path>",
      takes: "that question read from a path, or `-` for standard input",
    },
    { said: "--frames <n>", takes: "how many frames are sampled out of the ones there are" },
    {
      said: "--fps <n>",
      takes: "the rate the clip is resampled to, every frame left in place where none is said",
    },
    { said: "--timeout <s>", takes: "how many seconds the wait on the model runs for" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A clip or a directory of frames is named.",
    },
    {
      invariantKind: "departure",
      statement: "A clip and a directory of frames are never named together.",
    },
    {
      invariantKind: "departure",
      statement: "The frames sampled are spread evenly across the ones there are.",
    },
    {
      invariantKind: "departure",
      statement: "A directory with no frame is a fault rather than an empty answer.",
    },
    {
      invariantKind: "departure",
      statement: "Frames taken here are taken into a temporary place and cleared afterwards.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is the model's words.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is the run row's output.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here writes a clip or a frame the caller keeps.",
    },
    {
      invariantKind: "departure",
      statement:
        "That one of the two is named is held in this command's code rather than in a narrowing.",
    },
  ],
  name: "video-qa",
  arguments: [
    { argument: "argument/video", notWith: ["argument/frames-dir"] },
    { argument: "argument/frames-dir" },
    { argument: "argument/checklist" },
    { argument: "argument/checklist-file" },
    { argument: "argument/frames" },
    { argument: "argument/fps" },
    { argument: "argument/timeout" },
  ],
} as const satisfies Command
