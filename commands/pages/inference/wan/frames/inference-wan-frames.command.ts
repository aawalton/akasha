import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanFrames = {
  id: "01a093fb-2ee0-78a1-878b-af3bc16c19c1",
  type: "command",
  slug: "inference-wan-frames",
  definition: "the command writing a clip's frames out as numbered PNGs",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--video <mp4>", takes: "the clip the frames are read from" },
    { said: "--fps <n>", takes: "the rate this samples at, where unsaid takes every frame" },
    { said: "--out-dir <dir>", takes: "where the PNGs are written" },
  ],
  helpNotes: [
    "this is said with flags alone.",
    "this runs the host's ffmpeg, so it never reaches the GPU.",
    "a call naming no directory writes beside the clip, in a folder named for the clip.",
    "a path said here is read against the repository root rather than the folder the call was made from.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every word this takes is a flag or a flag's value.",
    },
    {
      invariantKind: "departure",
      statement: "A flag this does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "One numbered PNG is written for each frame this takes.",
    },
    {
      invariantKind: "departure",
      statement: "A clip that is not there is answered against the data rather than the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the GPU.",
    },
  ],
  name: "frames",
} as const satisfies Command
