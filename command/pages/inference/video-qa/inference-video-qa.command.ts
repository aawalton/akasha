import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceVideoQa = {
  id: "01a0685e-fd50-7d17-9486-a30db6114780",
  type: "command",
  slug: "inference-video-qa",
  definition: "the command answering a question about a clip from the frames taken out of it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clip or a directory of frames is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clip and a directory of frames are never named together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The frames sampled are spread evenly across the ones there are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A directory with no frame is a fault rather than an empty answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Frames taken here are taken into a temporary place and cleared afterwards.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer is the model's words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer is the run row's output.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a clip or a frame the caller keeps.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The question is said at its own flag or in the file a second flag names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the ffmpeg run, which clearing the frames away does not undo.",
    },
  ],
  name: "video-qa",
  arguments: [
    {
      argument: "argument/video",
      notWith: ["argument/frames-dir"],
      oneOf: ["argument/frames-dir"],
    },
    { argument: "argument/frames-dir" },
    {
      argument: "argument/checklist",
      notWith: ["argument/checklist-file"],
      oneOf: ["argument/checklist-file"],
    },
    { argument: "argument/checklist-file" },
    { argument: "argument/frames" },
    { argument: "argument/fps" },
    { argument: "argument/timeout" },
  ],
} as const satisfies Command
