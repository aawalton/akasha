import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceVideoQa = {
  id: "01a0685e-fd50-7d17-9486-a30db6114780",
  type: "command",
  slug: "inference-video-qa",
  definition: "the command answering a question about a clip from the frames taken out of it",
  code: "ts",
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
