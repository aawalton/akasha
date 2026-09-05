import type { ShellScript } from "../../shell-script.page-type.ts"

export const bashEnv = {
  id: "01a06860-f3aa-7219-a6c2-9803ce5b7b07",
  pageTypeSlug: "shell-script",
  slug: "bash-env",
  definition: "what every non-interactive bash the harness starts is given before it runs",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The script is read into another shell's run rather than run on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A shell reading this script reads the secrets held outside the repo.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shell that was handed no credentials file is pointed at the one its account signed in with.",
    },
    {
      invariantKind: "departure",
      statement: "A name the shell already carries is left standing.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline fails on the first command in it that fails.",
    },
    {
      invariantKind: "departure",
      statement:
        "The script ends true, so a shell reading it is not left holding a failing status.",
    },
    {
      invariantKind: "gap",
      statement:
        "What the credentials file is named is worked out here rather than read off the account's page.",
    },
  ],
} as const satisfies ShellScript
