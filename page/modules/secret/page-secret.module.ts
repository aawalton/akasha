import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageSecret = {
  id: "01a054c7-d2ae-7000-a800-88a46290bfd1",
  type: "module",
  slug: "page-secret",
  definition: "the values a page carries that holding its files does not reveal",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's secret values are in one sops file beside that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One file has every secret a page has rather than one file for each secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A secret's value is the text given including its newlines.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty value is refused rather than written over a usable value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key names are in the open and only the values are ciphertext.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing here writes the sops file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Ciphertext is composed here and landed by the gate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Landing the ciphertext parts a secret from an uncommitted value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Composed ciphertext with no sops mac is refused rather than handed back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with no sops file beside that page has no secrets.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A sops file that is there but will not decrypt is refused rather than read as empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "sops is handed the plaintext on its input rather than at a path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No plaintext reaches the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--filename-override` names the sops file the ciphertext is for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That name settles which rule encrypts, though no file sits at it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which key encrypts is read from the repository's `.sops.yaml` rather than said here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No key is spelled here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The key names a file has are read without decrypting that file.",
    },
  ],
} as const satisfies Module
