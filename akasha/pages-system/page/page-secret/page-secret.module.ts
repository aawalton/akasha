import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageSecret = {
  id: "01a054c7-d2ae-7000-a800-88a46290bfd1",
  pageTypeSlug: "module",
  slug: "page-secret",
  definition: "the values a page carries that holding its files does not reveal",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's secret values stand in one sops file beside it, keyed inside it.",
    },
    {
      invariantKind: "departure",
      statement: "One file holds every secret a page carries rather than one file for each.",
    },
    {
      invariantKind: "departure",
      statement: "A secret's value is one line of text.",
    },
    {
      invariantKind: "departure",
      statement: "An empty value is refused rather than written over a usable one.",
    },
    {
      invariantKind: "departure",
      statement: "The key names stand in the open and only the values are ciphertext.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here writes the sops file.",
    },
    {
      invariantKind: "departure",
      statement: "Ciphertext is composed here and landed by the gate, as any other file is.",
    },
    {
      invariantKind: "departure",
      statement: "That is what parts a secret from an uncommitted value, which no landing carries.",
    },
    {
      invariantKind: "departure",
      statement: "Composed ciphertext carrying no sops mac is refused rather than handed back.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no sops file beside it carries no secrets, which is an answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A sops file that stands but will not decrypt is refused rather than read as empty.",
    },
    {
      invariantKind: "departure",
      statement: "sops is handed a real file it can open and seek rather than a pipe.",
    },
    {
      invariantKind: "departure",
      statement:
        "The plaintext handed to sops stands under the folder git does not track and is taken away however the call ends.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--filename-override` names the sops file the ciphertext is for, so the creation rule matches the page's own name.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which key encrypts is read from the repository's `.sops.yaml` rather than said here.",
    },
    {
      invariantKind: "absence",
      statement: "No key is spelled here.",
    },
    {
      invariantKind: "absence",
      statement: "The key names a file holds are read without decrypting it.",
    },
  ],
} as const satisfies Module
