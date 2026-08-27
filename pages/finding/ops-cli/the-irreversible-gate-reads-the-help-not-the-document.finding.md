---
id: a68c6b43-45a4-5af2-9c9f-79c2c4b0deb7
slug: the-irreversible-gate-reads-the-help-not-the-document
page-type-slug: finding
title: "The irreversible gate reads the help not the document"
domain-slug: domain/ops-cli
---

# Claim

The help-before-execute gate reads a verb's exported help object, not the `irreversible` property on its command document. So it fires on five verbs nobody reviewed and on none of the thirty-six the review has declared.

# Evidence

`tools/commands/irreversible/list.ts:54` selects on `module.help?.irreversible === "irreversible"` — a string field on the help object each verb's `.ts` file exports. Five verbs declare it that way: `agent reap`, `agent send`, `ali fold`, `ask-alan`, `launcher realign`.

Thirty-six command documents carry `irreversible: true`, the boolean `properties/ops-command/irreversible.md` defines. Only `ali fold` is in both sets.

The verb is load-bearing rather than informational. `tools/lib/ops-verb.ts:63` spawns `ops irreversible list --json` inside `irreversibleVerbs()`, caching to `~/ops-irreversible.json`, and `tools/hooks/require-ops-help.ts` refuses a tool call for those verbs until the agent has read their `--help`. The gate that exists to make an agent stop and look fires on four verbs no document calls irreversible, and on none of `ops talos apply`, `ops project deploy`, `ops page-type hard-delete`, `ops contacts delete`, `ops image delete` or the thirty-one others the review read and declared.

`page-types/ops-command.md:26` says "Each command's own document declares whether it is irreversible." That is what the review writes and what the gate does not read.

Measured 2026-08-15. Three review delegates hit this independently, from `irreversible`, `merge-queue` and `image`.

The property is also spelled three ways across the corpus: 36 documents say `true`, 83 say `false` explicitly, and the rest are silent. The definition declares `default: false`, so an explicit `false` restates the default.
