---
id: d36b704e-ed24-5eac-bb5a-4f42b0b41db2
page-type-slug: finding
title: "Docs pointer sweep stops at typescript"
domain-slug: repo/code-repo
---

# Claim

Every standing measurement of the code repository's dangling `docs/*.md` pointer perimeter is scoped to TypeScript, and 34 tracked non-TypeScript files across 13 file kinds carry the same pointers — among them a git `pre-receive` hook, a Dockerfile, two Swift sources, a Postgres function and 13 `.fizz` specs — so a repair driven by any standing finding completes, reads as complete, and reaches none of them.

# Evidence

Measured 2026-08-08 in `~/code` while emptying `dirty/code/packages-alanwalton-native-shell-docs-healthkit-provisioning.md`, whose own old path two of these carriers cite.

`rg -l "docs/[a-z0-9-]+\.md" packages/ --glob '*.ts' --glob '*.tsx' | wc -l` returns 526. The same search with those two kinds EXCLUDED returns 34, and every one is tracked — `git ls-files --error-unmatch` over the whole list exits 0.

By extension: 13 `.fizz`, 4 `.sh`, 3 `.json`, 2 `.yml`, 2 `.swift`, 2 extensionless, and one each of `.yaml`, `.txt`, `.tsv`, `.sql`, `.service`, `.lua`, `.conf`, `.js`. The extensionless two are `packages/infra/git/transport/hooks/pre-receive` and `packages/infra/k8s/temper-watcher/build/Dockerfile`.

Three read in full rather than counted. `pre-receive:92` — "See packages/infra/ci/merge-queue/coordinator/docs/batch-formation-regen.md." `ios-widget/ClaudeUsagePayload.swift:6` — "See docs/widget-feed-pipe.md". `etc-systemd-system/sigterm-attribution.service:23` carries a `Documentation=` URL into `packages/shared/dotfiles/docs/sigterm-attribution.md`, a unit directive `systemctl show -p Documentation` prints rather than a comment.

The targets are gone repository-wide: `git ls-files "*.md"` returns 26 paths, none under a `/docs/` directory.

What this adds is the FILE-KIND bound of the sweep rather than another carrier. `code-repo/docs-pointer-perimeter-empty.md` gives its denominator as "519 tracked TypeScript files"; `code-repo/markdown-citations-outlive-the-quarantine.md` states "Measured in `~/code` over tracked `*.ts` and `*.tsx` only". `code-repo/systemd-documentation-urls-all-dead.md` reaches one non-TypeScript kind, its population the 16 user units under `.config/systemd/user/` — the system unit above falls outside it.

Not probed: whether the 34 cite distinct targets or repeat a few, and whether any carrier is walked by a tool rather than read by a person.
