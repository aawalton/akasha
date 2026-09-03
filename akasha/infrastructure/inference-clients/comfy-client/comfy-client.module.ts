import type { Module } from "@akasha/code-system/module"

export const comfyClient = {
  id: "01a0682d-8ef5-7008-9d37-824c7c7aafb6",
  pageTypeSlug: "module",
  slug: "comfy-client",
  definition: "a graph run on ComfyUI and the image that run made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The graph's own types are taken from `@akasha/comfy` rather than declared again.",
    },
    {
      invariantKind: "departure",
      statement: "An input image is uploaded before the graph naming it is queued.",
    },
    {
      invariantKind: "departure",
      statement: "An upload overwrites the name it lands under.",
    },
    {
      invariantKind: "departure",
      statement: "A graph the service answers node errors for is refused before any poll.",
    },
    {
      invariantKind: "departure",
      statement: "The run is polled for rather than watched over a socket.",
    },
    {
      invariantKind: "departure",
      statement:
        "A graph ComfyUI served wholly from cache makes no new output, so the prior render is recovered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prior render is matched by its graph read in a settled key order rather than by its id.",
    },
    {
      invariantKind: "departure",
      statement: "The newest matching prior render is the one recovered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A history the poll cannot reach is retried until the deadline rather than refused.",
    },
  ],
} as const satisfies Module
