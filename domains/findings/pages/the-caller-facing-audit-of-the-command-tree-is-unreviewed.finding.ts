import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theCallerFacingAuditOfTheCommandTreeIsUnreviewed = {
  id: "01a09124-3b6c-71a7-8a8b-8aed5528c2d9",
  type: "finding",
  slug: "the-caller-facing-audit-of-the-command-tree-is-unreviewed",
  domain: "page-type/command",
  claim:
    "An audit read the command tree as a caller meets it — the verbs, the nesting, the arguments, the listings — and proposed fifteen things that are not so and should be. Thirteen have since landed as intents on `initiative/athena-commands-cleanup`, covering help answering from the page, one renderer for the tree, every argument a command takes being a page, the definition line, every name being singular, `list` against `show`, one command for Alan's Google consent, and a machine-facing answer being a flag. One was ruled not worth acting on: a namespace may hold a single part. One is still unreviewed, and it lives nowhere but a transcript. It is a candidate intent rather than a decision, and it renames names a caller may hold in a script.",
  evidence:
    "Unreviewed, each with what it rests on.\n\n1. Every act a command carries is a command of its own, named in the tree. `inference-wan.command.ts:20,24,28,30` declare `generate`, `extend`, `frames` and `score` as positionals; `infrastructure-dev-server.command.ts:15-22` declares six the same way. None appears in any listing, so nobody finds `akasha inference wan score` from the top. Four of the seven such commands hide exactly one act.\n",
} as const satisfies Finding
