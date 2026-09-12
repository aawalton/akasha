import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanGenerate = {
  id: "01a093fa-cf48-7c82-9dc2-020adb45aa53",
  type: "command",
  slug: "inference-wan-generate",
  definition: "the command rendering one clip conditioned on a first frame, a last frame, or both",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--start-image <png>", takes: "the first frame the clip is conditioned on" },
    { said: "--end-image <png>", takes: "the last frame the clip is conditioned on" },
    { said: "--prompt <text>", takes: "the motion prompt" },
    { said: "--prompt-file <path>", takes: "the motion prompt read from a path, or `-` for stdin" },
    { said: "--negative-prompt <text>", takes: "what the sampler is steered away from" },
    {
      said: "--negative-prompt-file <path>",
      takes: "that steering read from a path, or `-` for stdin",
    },
    { said: "--seed <n>", takes: "the sampler seed" },
    { said: "--steps <n>", takes: "denoise steps across both experts" },
    { said: "--lightning", takes: "the four-step Lightning pair, which drops guidance to one" },
    { said: "--size <WxH>", takes: "the dimensions the clip is rendered at" },
    { said: "--frames <n>", takes: "the clip's length in frames" },
    { said: "--output <path>", takes: "where the mp4 is written" },
    { said: "--timeout <s>", takes: "how many seconds the wait on ComfyUI runs for" },
  ],
  helpNotes: [
    "this is said with flags alone.",
    "given both conditioning images the model interpolates first to last; given the last alone, it makes the lead-in that lands on it.",
    "a seed nothing named is drawn and recorded with the run, and the whole recipe this ran under is kept as an inference run.",
    "the lightning pair renders in four steps for iteration, and a keeper is rendered again at full steps.",
    "a path said here is read against the repository root rather than the folder the call was made from.",
    "the port ComfyUI answers on is `WAN_PORT` and the host data directory is `WAN_HOME`.",
    "the container is up and the weights are provisioned before this reaches the GPU.",
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
      statement: "Naming the last frame alone has the model make the lead-in to that frame.",
    },
    {
      invariantKind: "constraint",
      statement: "One workload runs on the GPU at a time.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here waits for the GPU to come free.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts the container or provisions the weights.",
    },
  ],
} as const satisfies Command
