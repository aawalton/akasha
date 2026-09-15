import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileKind = {
  id: "01a06553-a9b6-77a7-a681-f8ecbf29a0b3",
  type: "module",
  slug: "file-kind",
  definition: "the kind of file a path's own name says the file is",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path's name alone says its kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A whole basename is read before any extension of that basename is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path ending `.ts` or `.tsx` is TypeScript.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a path is TypeScript is answered from the ending alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name ending `.template` is read as the same name without that ending.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name no rule reaches says no kind rather than a kind meaning unknown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops secret is not yaml.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sops secret's keys are sops's own and its values are ciphertext.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sops config is sops's own rules rather than a secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A jsonl file is one JSON value to a line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Bash is a kind of sh.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Yml and yaml are one language under two endings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A systemd timer stands on the service that timer starts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dot-name ending `ignore` has the path patterns a tool leaves alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens the file the path names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says whether a kind is text or bytes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which module system loads a JavaScript file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here tells an icon or a texture from a photograph.",
    },
  ],
} as const satisfies Module
