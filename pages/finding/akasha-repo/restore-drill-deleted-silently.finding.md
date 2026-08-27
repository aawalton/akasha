---
id: 3a8f3549-49ec-541f-9741-e3f616639ed2
page-type-slug: finding
title: "Restore drill deleted silently"
domain-slug: repo/instructions-repo
---

# Claim

Nothing rebuilds `~/instructions` from its remote any more. The drill that did was deleted by a refactor whose message does not mention it, and no successor exists, so the instruction tree's recovery path is now untested and unwritten.

# Evidence

`ops instructions restore` is absent from the eighteen verbs `ops instructions --help` lists, and `ops instructions restore --help` exits 1. There is no `tools/restore.ts`.

It was deleted, not moved. `git show --stat c0af9c4ae0` removes `restore.ts` (199 lines), `restore-result.ts` (56) and `restore.cli.test.ts` (259) from `packages/agents/instructions/src/instructions/`. `git ls-files | grep -i restore-drill` in `~/code` returns nothing.

The removal was silent. That commit's subject is "ops instructions: forward to the instructions tools rather than reimplementing them", and its body names the capabilities it knew went — "the `[roles]` rung, prior-art, probe" — saying the replacement text names each rather than pointing at a successor that does not exist. It does not mention restore, the drill, or recovery anywhere.

It was built deliberately, under #16610: `9cc2050035` "feat(#16610): a restore drill lives in the code repo, because a recovery path that lives inside what it recovers dies with it".

No successor. `packages/infra/scripts/dr-runbook.sh` scopes itself in its own header to "the CloudNativePG Postgres cluster `postgres-cnpg`" and names the instruction tree nowhere. Nothing under `tools/` clones.

The asymmetry is what makes this worth filing: a backup never restored and no backup at all are indistinguishable until either is needed. The tree has a remote and an off-cluster mirror, so the copies exist; what no longer exists is any evidence they can be turned back into a working tree.

Found while ingesting `dirty/code/packages-agents-instructions-docs-restore-drill.md`, the deleted instrument's own documentation, which is itself being emptied.

Searched findings for `recovery path|restore drill|shares a dependency` and `instruction tree|instructions repo`; the nearest, `pages/finding/infra/ingest-cache-sole-copy.finding.md`, is about the Awen ingest cache.
