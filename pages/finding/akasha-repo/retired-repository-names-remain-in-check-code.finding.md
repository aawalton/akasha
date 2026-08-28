---
page-type-slug: finding
title: "Retired repository names remain in check code"
domain-slug: repo/akasha-repo
---

# Claim

References to the retired repositories remain in akasha, all of them in check code: the initiative that cleared the rest closed with 240 outstanding, because checks passed to another champion before they were reached.

# Evidence

Measured 2026-08-28 with `bun infra/cluster-checks/src/checks/check-instruction-references.ts --repo-root /var/home/walton/repos/akasha`, which refuses without `--repo-root` so a bare run reports nothing without looking.

Outside `pages/finding/`, 277 violations remain. 240 are under `tools/lib/check-workflow`, `infra/cluster-checks` or `checks-system`. The other 37 are deliberate and correct as written: 27 in `pages/notification-feed`, an append-only log a rewrite would falsify; 8 in `pages/all-about-alan-finding`, whose page type extends `finding`; 1 in `pages/book-chapter`, a verbatim transcript; 1 on the initiative page itself, naming the retired repos on purpose.

The 240 are `<kind>:<repo>:<path>` graph node ids under `tools/lib/check-workflow` and `infra/cluster-checks`, whose repo segment spells `code` or `instructions`. Nothing reads that segment: the only parser splits the triple and discards it, and the graph the ids address was replaced by one taking a structured `{repo, key}` rather than a joined triple. A name rewritten now is written twice.

The count is a floor rather than a measure. `infra/cluster-checks/src/lib/instruction-reference-scan.ts` matches three patterns and all three are shaped for one repository: an `instructions:` scheme reference at :7, a bare `(domains|page-types|properties)/*.md` path at :9, and a `repos/instructions/` path at :11. It has no pattern for `code:`, `memory:`, `books:` or `stories:`, and none for prose. A separate search found 252 addresses across 103 files it cannot see.

Widening it was held back deliberately: it is registered as a live cluster check at `tools/lib/check-workflow/check-configs-component.ts:25` and `repo-wide-ts-scanners.ts:104`, and Zero At Landing forbids landing a check whose zero is out of reach.
