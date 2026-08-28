---
id: 874deb3d-6ed5-5d6c-be62-aa324fbaa931
slug: summary-and-definition-both-claim
page-type-slug: finding
title: "Summary and definition both claim"
domain-slug: page-type/ops-command
---

# Claim

A verb's summary and its domain definition are two authored claims about what the verb is, and only the summary is shown to anyone.

# Evidence

`ops temper watcher start` declares the summary "Start the watcher worker as a detached single global daemon (from source via `bun run`, WATCHER_RUNTIME=source) and write its state file." Its body calls `startUnit()` on a systemd user unit and writes no state file; `run` is what writes one. `ops temper watcher stop` declares "Stop the running watcher daemon (SIGTERM) and clear its state file"; its body calls `stopUnit()` and clears nothing, and its own help block says a direct SIGTERM would only trigger a respawn.

Both domain documents are correct — "the watcher's systemd user unit brought up", "taken down" — so the drift is in the summary alone. `renderListing` prints `cmd.summary` for every verb under the prefix a reader typed, and prints the definition nowhere. `verbs-declare-summary` checks 715 verbs declare a summary and never what one says. No check or gate under `tools/checks`, `tools/gates` or `tools/lib` mentions `domains/commands` at all.

Not measured: how many of the other 713 summaries disagree with their verb, which cannot be counted mechanically; whether any reader other than the dispatcher's listing consumes the summary; and what it would cost the listing to render definitions instead.
