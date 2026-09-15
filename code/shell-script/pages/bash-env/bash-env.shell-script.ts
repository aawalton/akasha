import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const bashEnv = {
  id: "01a06860-f3aa-7219-a6c2-9803ce5b7b07",
  type: "page-type/shell-script",
  slug: "bash-env",
  definition: "what every non-interactive bash the harness starts is given before it runs",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The script is read into another shell's run rather than run on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shell reading this script reads the secrets held outside the repo.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shell that was handed no credentials file is pointed at the file its account signed in with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the shell already has is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pipeline fails on the first command in that pipeline that fails.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The script ends true.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shell reading the script is not left with a failing status.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shell reaches this script by a link outside every checkout.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The credentials file's name is worked out here rather than read off the account's page.",
    },
  ],
  linkedAt: "~/.local/state/akasha/bash-env",
} as const satisfies ShellScript
