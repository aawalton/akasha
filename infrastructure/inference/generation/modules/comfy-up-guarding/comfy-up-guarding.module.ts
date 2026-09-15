import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const comfyUpGuarding = {
  id: "01a0912f-d5ac-748b-919b-23e778a9482c",
  type: "module",
  slug: "comfy-up-guarding",
  definition: "what a ComfyUI script refuses to start without",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A machine with no podman is refused before anything is built.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A machine the GPU is kept from the containers on is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That boolean is read only on a machine that answers what its booleans are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the one-time fix and the error that fix heads off.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks the index for anything.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here names one generation.",
    },
  ],
} as const satisfies Module
