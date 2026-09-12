import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanFrame = {
  id: "01a093fb-2ee0-78a1-878b-af3bc16c19c1",
  type: "command",
  slug: "inference-wan-frame",
  definition: "the command writing a clip's frames out as numbered PNGs",
  code: "ts",
  test: "ts",
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
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "frame",
  arguments: [
    { argument: "argument/video", required: true },
    { argument: "argument/fps" },
    { argument: "argument/out-dir" },
  ],
} as const satisfies Command
