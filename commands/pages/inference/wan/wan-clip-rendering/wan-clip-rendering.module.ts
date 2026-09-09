import type { Module } from "@akasha/code/module"

export const wanClipRendering = {
  id: "01a072fa-322d-7288-8757-5da45309b677",
  pageTypeSlug: "module",
  type: "module",
  slug: "wan-clip-rendering",
  definition: "the clip a wan call has the model make",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generate naming neither a first frame nor a last frame is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two conditioning images with one file name are refused rather than staged over each other.",
    },
    {
      invariantKind: "departure",
      statement:
        "An extend's context window is fewer frames than the clip that window is pulled from holds.",
    },
    {
      invariantKind: "departure",
      statement: "An extend's whole length is a frame past four times a whole number.",
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
      invariantKind: "absence",
      statement: "Nothing here starts the container or provisions the weights.",
    },
  ],
} as const satisfies Module
