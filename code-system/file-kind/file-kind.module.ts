import type { Module } from "../modules/module.page-type.ts"

export const fileKind = {
  id: "01a06553-a9b6-77a7-a681-f8ecbf29a0b3",
  pageTypeSlug: "module",
  slug: "file-kind",
  definition: "the kind of file a path's own name says the file is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path's name alone says its kind.",
    },
    {
      invariantKind: "departure",
      statement: "A whole basename is read before any extension of it is.",
    },
    {
      invariantKind: "departure",
      statement: "A name ending `.template` is read as the same name without that ending.",
    },
    {
      invariantKind: "departure",
      statement: "A name no rule reaches says no kind rather than a kind meaning unknown.",
    },
    {
      invariantKind: "departure",
      statement: "A sops secret is not yaml.",
    },
    {
      invariantKind: "departure",
      statement: "A sops secret's keys are sops's own and its values are ciphertext.",
    },
    {
      invariantKind: "departure",
      statement: "The sops config is sops's own rules rather than a secret.",
    },
    {
      invariantKind: "departure",
      statement: "A jsonl file is one JSON value to a line.",
    },
    {
      invariantKind: "departure",
      statement: "Bash is a kind of sh.",
    },
    {
      invariantKind: "departure",
      statement: "Yml and yaml are one language under two endings.",
    },
    {
      invariantKind: "departure",
      statement: "A systemd timer stands on the service it starts.",
    },
    {
      invariantKind: "departure",
      statement: "A dot-name ending `ignore` holds the path patterns a tool leaves alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the file the path names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether a kind is text or bytes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which module system loads a JavaScript file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here tells an icon or a texture from a photograph.",
    },
  ],
} as const satisfies Module
