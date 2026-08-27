---
id: 87c9f517-2018-5225-8d24-c705e3bfe98f
page-type-slug: finding
title: "Reachable only by pin"
domain-slug: domain/global
---

# Claim

`agent-governance` governs no path and nothing in the corpus names it, so the only route to its three decisions is a seat pinned to it. The governance machinery those decisions are about is not among the surfaces bound by them.

# Evidence

`domains/agent-governance.md` declares no `instructions-path:`, no `code-path:` and no `memory-path:`. No document declares `domain-parents: agent-governance`. No link or glossary entry points at it.

The sharp form: `ops instructions governs --file-path tools/lib/claim.ts` returns eight surfaces and this is not among them. The same holds for `tools/governs.ts`, `tools/lib/agent-governance.ts`, `tools/gates/read-what-governs.ts` and `tools/hooks/block-ungoverned-writes.ts`. Whoever edits the code these decisions describe is never asked to read them — which is this domain's own first Design entry, "A route nothing guards is a gap, not permission", turned on itself.

It is not anomalous. Four siblings under `agent-harness` share the shape exactly: `instrument`, `seat`, `agent` and `code-harness` each declare no path key. Confirmed independently by the archivist filing this.

Against adding one: a glob here would levy this whole document on every edit under whatever it covers, which `agent-harness` Dilution prices against every other rule those readers already hold. `instructions-harness` already governs `tools/`, so any glob added here lands inside its area rather than in open ground.

Raised by the `review-instructions` reading of `domains/agent-governance.md` on 2026-08-06, which landed two repairs and kept seven slices.
