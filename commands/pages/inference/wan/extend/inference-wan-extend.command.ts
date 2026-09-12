import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceWanExtend = {
  id: "01a093fb-0896-7f06-b8ca-489590932fe3",
  type: "command",
  slug: "inference-wan-extend",
  definition: "the command rendering fresh frames before or after a clip",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--context <mp4>", takes: "the clip the conditioning window is taken from" },
    {
      said: "--direction <forward|back>",
      takes: "whether the fresh frames land after the clip's end or before its start",
    },
    {
      said: "--context-frames <n>",
      takes: "how many of the clip's own frames the window holds",
    },
    { said: "--new-frames <n>", takes: "how many frames this asks to generate" },
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
    { said: "--output <path>", takes: "where the mp4 is written" },
    { said: "--timeout <s>", takes: "how many seconds the wait on ComfyUI runs for" },
  ],
  helpNotes: [
    "this is said with flags alone.",
    "the conditioning window is a run of the clip's own frames, so only the frames beside that window are denoised.",
    "the length asked for is snapped up to four times a whole number plus one, which is the length the latent takes.",
    "a call told no size renders at the context clip's own.",
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
  name: "extend",
} as const satisfies Command
