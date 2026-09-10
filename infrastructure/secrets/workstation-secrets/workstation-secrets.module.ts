import type { Module } from "../../../code-system/modules/module.page-type.types.ts"

export const workstationSecrets = {
  id: "01a08ce2-2aad-723b-b3e8-bef5117eac5c",
  pageTypeSlug: "module",
  type: "module",
  slug: "workstation-secrets",
  definition: "a secret written into the workstation env file the shell reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The file written is the one every shell the harness starts sources.",
    },
    {
      invariantKind: "departure",
      statement: "A name written reaches the next call without anything being restarted.",
    },
    {
      invariantKind: "departure",
      statement: "A name the file already holds is replaced where that name sits.",
    },
    {
      invariantKind: "departure",
      statement: "A name the file holds without `export` is replaced by one with it.",
    },
    {
      invariantKind: "departure",
      statement: "A name no line holds is appended at the end.",
    },
    {
      invariantKind: "departure",
      statement: "A name another name opens with is not mistaken for that name.",
    },
    {
      invariantKind: "departure",
      statement: "The file is left readable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "A value carrying a quote the shell would act on is refused.",
    },
    {
      invariantKind: "absence",
      statement: "No value written here is answered back to the caller.",
    },
  ],
} as const satisfies Module
