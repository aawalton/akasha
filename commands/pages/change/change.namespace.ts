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
        "A long value opens `old HEREDOC-OLD`, then the body, then `HEREDOC-OLD` on a line of its own.",
        "That fence is the key in capitals after `HEREDOC-`, and a body holding it as a line takes another.",
        "`old HEREDOC-OLD no-newline` keeps no newline on the body's last line.",
        "Open and close the heredoc with nothing between to be told which keys that change takes.",
      ],
    },
  ],
} as const satisfies Namespace
