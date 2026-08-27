---
id: efb59522-1a4e-5f7a-9e2c-bec2d7b1aa66
page-type-slug: finding
title: "No write side to the page query service"
domain-slug: domain/pages-system
---

# Claim

A deployed pod can read a file-backed page and cannot write one, so a property whose value is produced in production has nowhere on the file to land.

# Evidence

Measured 2026-08-19, moving the persona page type off its rows under `personas-backed-by-files`.

The read side is whole. `http://page-query-service.page-query-service.svc.cluster.local:8787/q/persona-all` answers all 41 personas from `domains/personas/*.md`, and `/q/claude-account-all` returns `access-token-expires-at` and `five-hour-percent-used`, which stand in `claude-accounts/aawalton.fast.yaml` rather than in the document. So the service already serves frontmatter and fast properties alike.

There is no matching write path. Every writer of a fast property stands in the instructions repo under `tools/` — `tools/lib/page-write.ts`, `tools/lib/oauth-usage.ts`, `tools/lib/seat-turn.ts`, `tools/lib/supervisor-heartbeat-beat.ts` and six others — all of them running on the workstation against a working tree. Nothing in `packages/` writes one.

This is what holds `lastMessagedAt` on the persona row. Its property definition carries `fast: true` and says the value "is stamped on every message a persona sends, so it stands beside her page rather than in it", which is the right shape. One of its two writers is `packages/alanwalton/web/app/questions/lib/resolve-question.server.ts:133`, a deployed route; it has no way to reach a file. Its four readers could all move onto the query service today, and moving them would strand the value.

Not measured: whether a write side is wanted at all, or whether a value produced in production belongs on a page a pod cannot reach. `views-over-files` was not opened.
