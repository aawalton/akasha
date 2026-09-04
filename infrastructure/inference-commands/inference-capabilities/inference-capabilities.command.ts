import type { Command } from "@akasha/command-system/command"

export const inferenceCapabilities = {
  id: "01a0685e-fd50-72b2-a396-3f2715e4d3b4",
  pageTypeSlug: "command",
  slug: "inference-capabilities",
  definition: "the command naming the image pool services and the mflux batch tools beside them",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "an image pool service is one the registry declares as a pool member whose name opens with `image-`.",
    "each is reported with the model path its command binds, the port it answers on, and the route it takes.",
    "a service binding `--model-type image-edit` answers on the edits route and every other on the generations route.",
    "the pool holds one resident at a time, so the cop stands in front of every service named here.",
    "the mflux tools are read off the host's env for the first image service, and a host that will not answer is said so rather than refused.",
    "an mflux tool runs against the env rather than the pool, so the resident is evicted before one is called.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An image pool service is a pool member whose name opens with `image-`.",
    },
    {
      invariantKind: "departure",
      statement: "The route a service takes is read from the model type its command binds.",
    },
    {
      invariantKind: "departure",
      statement: "The mflux tools are read off the env of the first image service.",
    },
    {
      invariantKind: "departure",
      statement: "A host that will not answer is reported rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "No image service declared is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes what is resident.",
    },
  ],
} as const satisfies Command
