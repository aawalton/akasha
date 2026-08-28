---
id: b8e21339-5008-5094-aad7-067c2d90f624
slug: headroom-apart-from-its-siblings
page-type-slug: finding
title: "Headroom apart from its siblings"
domain-slug: domain/agent-harness
---

# Claim

The Headroom rule stands on `domains/agent-harness.md` while the two rules bounding what an instrument may report — Population and Horizon — stand on `domains/instrument.md`, so a reader gathering what an instrument may say meets one of the three somewhere else.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/agent-harness.md` dispatched from `review-documents`. The reading raised it as a fork it left standing, and the document's sections were re-read here rather than taken from it.

`domains/instrument.md` carries one principle, Negative Control, and exactly two rules: Population and Horizon. `domains/agent-harness.md` carries Headroom: "Never report that a part is close to its bound as a defect, in your own words or in an instrument's."

The reading gave its reason for leaving it: Headroom binds an agent's own words as well as an instrument's, which is the sense in which it is not an instrument rule. That reason is what makes this a placement question rather than a misfiling — `domains/agent-harness.md` carries Single Authority, which settles where a claim binds from but does not say which of two candidate documents a claim about two things belongs on.

The gap has since cost a near-deletion. On 2026-08-28, at `d3626e811`, a census judging every finding open under `domain/pages-system` reached Headroom from that domain and ruled `land-ts-stands-sixty-one-bytes-under-its-length-ceiling` wrong for breaching it. Headroom does not stand there: it is stated only on `pages/domain/agent-harness.domain.md`, and `agent-harness` and `pages-system` are siblings, each carrying `domain-parent-slug: domain/global`, so nothing carries the rule across. Every number in the finding reproduced exactly, and it was kept. A rule an agent reaches for from a domain it does not reach is worse than one a reader misses, because the reader finds nothing while the agent finds a rule and applies it.

Not measured: whether any reader has looked for Headroom on `domains/instrument.md` and missed it, whether Population or Horizon likewise reach beyond instruments, or what the rule would lose in force by moving.
