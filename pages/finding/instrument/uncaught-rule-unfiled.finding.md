---
id: a38b9952-6f1b-5eae-87a3-fd0de936034f
slug: uncaught-rule-unfiled
page-type-slug: finding
title: "Uncaught rule unfiled"
domain-slug: domain/instrument
---

# Claim

The rule that a failure reaching a person before the instrument did is a false negative by construction stands only in a quarantined document queued for removal, so the sweep that empties `dirty/` takes it. Its load-bearing words are "by definition — no triage, no judgment call": without them a seat weighs whether the miss deserved an alert, and the answer always available is that this one was unusual. Nothing live carries it, and no standing finding does either.

# Evidence

The rule stands at `dirty/maybe-keep/skills/infra/SKILL.md` lines 68-122, kept by the seat that emptied `dirty/skills/infra/SKILL.md`, in the source's own words: "A false negative arrives as an upstream failure report, and is one by construction. An agent or Alan tried to use something and it was not running or not healthy. Because silence *is* the health claim, any failure that reaches a person before the instrument did is a false negative **by definition** — no triage, no judgment call."

That keep carries the sentence above it too, item 1, "Silence is the claim, and both failure directions are defects", recording why: read alone, item 2 "is a definition with no premise". It also composes an `## Uncaught` rule for `domains/instrument.md`: "File a defect against the instrument wherever a failure reached a person before the instrument reported it."

A thinner second copy stood at `dirty/skills/infra/rulings.md` lines 66-74 — without the premise, citing "Property 2 of the vision", which does not exist — and I removed it at commit `528405132`.

Nothing live carries it. The near miss is `domains/instrument.md`'s Negative Control: "Make an instrument fail before you trust it. A blind instrument and a clean one both return nothing. Show it the case it must catch while you build it — afterwards no result of its own says it was never looking." That binds at build time; this is the one later observation that says a live instrument was blind.

No standing finding covers it. `rg -uuu -il "false negative|silence is the|reached a person|before the instrument" findings/` returns two files, `instrument/pgrep-pattern-matches-the-asker.md` and `all-about-alan/non-transparency-estimate-untested.md`, neither this claim. `findings/instrument/` holds eighteen and `findings/alert/` four; none is this.

Not established: whether the owner has seen the keep and declined it. An unpromoted keep and a refused one look the same from here.
