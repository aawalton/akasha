import type { ShellScript } from "akasha/code/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthForegroundSync = {
  id: "01a0918a-3664-7abd-bf6c-187ed7e96493",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-foreground-sync",
  definition: "the Swift draining health samples when the app comes forward",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A locked phone's health store is shut to every read.",
    },
    {
      invariantKind: "departure",
      statement: "The app coming forward is the one moment the phone is certainly unlocked.",
    },
    {
      invariantKind: "departure",
      statement: "A run the app started posts no notice and reports as every other run does.",
    },
    {
      invariantKind: "departure",
      statement: "A quarter hour is spent before a run rather than after it.",
    },
    {
      invariantKind: "departure",
      statement: "A run that never got to start costs a quarter hour and loses no sample.",
    },
    {
      invariantKind: "departure",
      statement: "A run says it began before that run reads a thing.",
    },
    {
      invariantKind: "departure",
      statement: "A run that began and never finished reads apart from a run that never began.",
    },
  ],
} as const satisfies ShellScript
