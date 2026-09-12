import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanFrame = {
  id: "01a093fb-2ee0-78a1-878b-af3bc16c19c1",
  type: "command",
  slug: "inference-wan-frame",
  definition: "the command writing a clip's frames out as numbered PNGs",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--video <mp4>", takes: "the clip the frames are read from" },
    { said: "--fps <n>", takes: "the rate this samples at, where unsaid takes every frame" },
    {
      said: "--out-dir <dir>",
      takes: "where the PNGs are written, a folder beside the clip named for it where none is said",
    },
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
  name: "frame",
} as const satisfies Command
