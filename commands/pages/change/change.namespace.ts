import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const change = {
  id: "01a0814e-a6ed-7570-b81f-ebad640d95f2",
  type: "namespace",
  slug: "change",
  definition: "the edits an agent keeps, and what becomes of them",
  parts: [
    "command/change-show",
    "command/change-list",
    "command/change-drop",
    "command/change-draft",
    "command/change-apply",
    "command/change-repeat",
    "module/change-arguing",
  ],
  name: "change",
  directives: [
    {
      directiveKind: "rule",
      name: "Piping A Change",
      act: "Pipe a change's arguments in on one quoted heredoc, opening a fence for each value that is a body.",
      warrant:
        "A change reads its arguments off standard input, and the shell rewrites an unquoted heredoc.",
      aids: [
        "The whole call is `akasha change draft <change> <<'HEREDOC'`, the keys, then `HEREDOC` alone.",
        "A short value is one line, as `message: what the commit is for` is.",
        "A long value opens `key HEREDOC-KEY`, then the body, then `HEREDOC-KEY` on a line of its own.",
        "The fence is yours to pick, so a body holding `HEREDOC-KEY` as a line takes another word.",
        "`key HEREDOC-KEY no-newline` keeps no newline on the body's last line.",
        "Say the change with nothing piped in to be told which keys that change takes.",
      ],
    },
  ],
} as const satisfies Namespace
