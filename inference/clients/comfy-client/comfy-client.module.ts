import type { Module } from "@akasha/code/module"

export const comfyClient = {
  id: "01a0682d-8ef5-7008-9d37-824c7c7aafb6",
  pageTypeSlug: "module",
  slug: "comfy-client",
  definition: "a graph run on ComfyUI and the image that run made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The graph's own types are taken from `comfy-graph` rather than declared again.",
    },
    {
      invariantKind: "departure",
      statement: "An input image is uploaded before the graph naming that image is queued.",
    },
    {
      invariantKind: "departure",
      statement: "An upload overwrites the name that upload lands under.",
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
      statement: "A graph ComfyUI served wholly from cache makes no new output.",
    },
    {
      invariantKind: "departure",
      statement: "A graph that makes no new output is answered with the prior render.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prior render is matched by its graph read in a settled key order rather than by its id.",
    },
    {
      invariantKind: "departure",
      statement: "The newest matching prior render is the render recovered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A history the poll cannot reach is retried until the deadline rather than refused.",
    },
  ],
} as const satisfies Module
