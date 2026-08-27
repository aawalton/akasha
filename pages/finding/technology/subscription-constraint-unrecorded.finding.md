---
id: 9df92540-ad2b-566d-aaac-09830b4d9e5c
slug: subscription-constraint-unrecorded
page-type-slug: finding
title: "Subscription constraint unrecorded"
domain-slug: domain/technology
---

# Claim

The architecture's binding constraint is recorded in no live document and enforced by no mechanism. Alan's ruling is subscription client only — no API keys, no Cloud, no Agent SDK, and the OAuth proxy stays — bought at roughly twenty times the usage per dollar and deliberately un-hedged. So "shed the proxy via the Agent SDK" reads as a simplification, is what the vendor documents, and passes every check the estate runs.

# Evidence

Recovered from `dirty/skills/technology/SKILL.md` while emptying it 2026-08-07, and carried verbatim to `dirty/maybe-keep/skills/technology/SKILL.md` at commit `fe4352af4992079376adbab43269e22b44690160`. Both are quarantined and queued for removal, which is why this is filed rather than left there.

Its words: "Subscription client only. No API keys, no Cloud, no Agent SDK. The OAuth proxy stays… leaving the envelope costs roughly twenty times the usage per dollar and an architecture with no fallback behind it. It outranks capability: a genuinely better tool that requires an API key is not better here." The same file adds an estimated "~$20k/month equivalent on API for the same work", and calls "shed it via the Agent SDK" "void by construction rather than by preference".

No live document carries it. `rg -uuu -n -i 'subscription|API key|Agent SDK'` over `instructions/domains/` returns nothing, nor does `~/memory`. `domains/technology.md` is fourteen lines — a Definition and a one-line Design, "A system's terms change without notice" — with no Principles or Rules.

No tracked code carries it, and the first pass misled. An unscoped `~/code` search appeared to hit; the hits were vendored `huggingface_hub` files under three `.venv/` trees, and `git ls-files | grep -c site-packages` returns 0 — untracked dependency output. Scoped, `git grep -l -i -E 'ANTHROPIC_API_KEY|subscription.only|Agent SDK'` over the 3,986 tracked files in `packages/agents/**` and `packages/infra/**` returns nothing.

No mechanism refuses the act. `ops enforcement list` reports 231 mechanisms across 4 sources; filtered on `oauth|api|subscription|token|proxy|model` it returns one line, `check-design-tokens`, which is CSS design tokens.

Beside its neighbour: `technology/ai-infra-ruling-ungoverned.md` is about OWNERSHIP of the AI packages. This is the CONSTRAINT they exist to satisfy. Neither states the other.

Not established: whether the two figures were re-measured.
