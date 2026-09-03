import type { Module } from "@akasha/code-system/module"

export const editorPageSweeping = {
  id: "01a0686a-7a57-7732-b3a5-ceb98342f370",
  pageTypeSlug: "module",
  slug: "editor-page-sweeping",
  definition: "every editor page whose window or terminal is gone taken away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A window killed rather than closed leaves its page and its groups standing until this sweep.",
    },
    {
      invariantKind: "departure",
      statement: "Where a page stands is asked of the page type's slug rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "A page type that is renamed carries its sweep with it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a window or a terminal is still there is read from the process the page states rather than from how long the page has stood.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stated process is a pid paired with the start time the kernel fixed at exec, so a recycled pid reads as gone.",
    },
    {
      invariantKind: "departure",
      statement: "A page is taken only where /proc answers that no such pid stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating no process, a process that will not parse, and a /proc entry that will not read are each a reading that did not happen.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose process could not be read is named as uncertain, left standing, and the run that met it exits non-zero.",
    },
    {
      invariantKind: "departure",
      statement: "An unreadable window keeps its groups and its tabs standing with it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A group or a tab names its window in its own name, and a process holds no dash, so everything before the first dash is the window.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is taken away unless the sweep is asked to, because what it takes is a commit in another repository.",
    },
    {
      invariantKind: "gap",
      statement:
        "The pages swept are the editor pages standing under `akasha/alan/harness/code-editor`, which state a process and hold pages of their own, rather than the markdown pages under `pages/`, which no longer stand.",
    },
  ],
} as const satisfies Module
