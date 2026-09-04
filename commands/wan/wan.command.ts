import type { Command } from "../../command-system/commands/command.page-type.ts"

export const wan = {
  id: "01a0680a-9cbf-72f6-b77c-23229fe219ca",
  pageTypeSlug: "command",
  slug: "wan",
  definition: "the command acting on Wan video clips and the frames taken out of them",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "generate",
      takes: "the act, which is one clip conditioned on a first frame, a last frame, or both",
    },
    {
      said: "extend",
      takes:
        "the act, which is fresh frames before or after a clip, conditioned on a window of its own",
    },
    { said: "frames", takes: "the act, which is a clip's frames written out as numbered PNGs" },
    {
      said: "score",
      takes: "the act, which is each frame's cosine against a reference identity",
    },
    { said: "--start-image <png>", takes: "the first frame a generate is conditioned on" },
    { said: "--end-image <png>", takes: "the last frame a generate is conditioned on" },
    { said: "--context <mp4>", takes: "the clip an extend takes its conditioning window from" },
    {
      said: "--direction <forward|back>",
      takes: "whether an extend generates after the clip's end or before its start",
    },
    {
      said: "--context-frames <n>",
      takes: "how many of the clip's own frames the extend window holds",
    },
    { said: "--new-frames <n>", takes: "how many frames an extend asks to generate" },
    { said: "--video <mp4>", takes: "the clip a frames act reads" },
    {
      said: "--fps <n>",
      takes: "the rate a frames act samples at, where unsaid takes every frame",
    },
    { said: "--out-dir <dir>", takes: "where a frames act writes the PNGs" },
    { said: "--frames-dir <dir>", takes: "the directory of frames a score act reads" },
    { said: "--reference <png>", takes: "the identity a score act measures each frame against" },
    { said: "--floor <f>", takes: "the cosine at or above which a frame is the same identity" },
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
    { said: "--frames <n>", takes: "a generated clip's length in frames" },
    { said: "--output <path>", takes: "where a generate or an extend writes the mp4" },
    { said: "--timeout <s>", takes: "how many seconds the wait on ComfyUI runs for" },
  ],
  helpNotes: [
    "the act is the first word, one call names one act, and each act takes its own flags alone.",
    "a generate given both conditioning images interpolates first to last; given the last alone, the model makes the lead-in that lands on it.",
    "an extend conditions on a window of the clip's own frames, so only the frames beside that window are denoised.",
    "the length an extend asks for is snapped up to four times a whole number plus one, which is the length the latent takes.",
    "an extend not told a size renders at the context clip's own.",
    "a seed nothing named is drawn and recorded with the run, and the whole recipe a generate or an extend ran under is kept as an inference run.",
    "the lightning pair renders in four steps for iteration, and a keeper is rendered again at full steps.",
    "a frames act runs the host's ffmpeg and a score act runs the scorer on the CPU, so neither reaches the GPU.",
    "a score answers one row for each frame, carrying its cosine and whether that cosine clears the floor.",
    "a path said here is read against the repository root rather than the folder the call was made from.",
    "the port ComfyUI answers on is `WAN_PORT`, the host data directory is `WAN_HOME`, and the scorer's image is `WAN_IMAGE`.",
    "the container is up and the weights are provisioned before any of this reaches the GPU.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The act is the first word and one call names one act.",
    },
    {
      invariantKind: "departure",
      statement: "A flag an act does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A generate naming neither a first frame nor a last frame is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A generate naming the last frame alone has the model make the lead-in to it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two conditioning images carrying one file name are refused rather than staged over each other.",
    },
    {
      invariantKind: "departure",
      statement:
        "An extend's context window is fewer frames than the clip it is pulled from holds.",
    },
    {
      invariantKind: "departure",
      statement: "An extend's whole length is four times a whole number plus one.",
    },
    {
      invariantKind: "departure",
      statement: "An extend told no size renders at the context clip's own.",
    },
    {
      invariantKind: "departure",
      statement: "A seed nothing named is drawn and recorded with the run.",
    },
    {
      invariantKind: "departure",
      statement: "The recipe a generate or an extend ran under is kept as an inference run.",
    },
    {
      invariantKind: "departure",
      statement: "A frames act writes one numbered PNG for each frame it takes.",
    },
    {
      invariantKind: "departure",
      statement: "A score answers one row for each frame and nothing beside them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reference no face is found in is answered against the data rather than the caller.",
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
