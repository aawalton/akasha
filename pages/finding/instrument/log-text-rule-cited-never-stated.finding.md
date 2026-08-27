---
id: 8967b55b-4531-5492-8982-331dcf176e68
slug: log-text-rule-cited-never-stated
page-type-slug: finding
title: "Log text rule cited never stated"
domain-slug: domain/instrument
---

# Claim

The rule against reading a verdict out of log text is cited in the corpus as something a domain already refuses, and no document anywhere states it. The one place it is written down is a quarantined source queued for removal, and the document that leans on it as settled does not contain it.

# Evidence

Read 2026-08-07 while emptying `dirty/skills/ci/rulings.md`.

The rule is Alan's, dated. That source records his scope ruling of 2026-07-27 on project #16470 — "A verdict surface can report a pass it never observed, about a subject it never names, in a case it does not cover", `status = done` — and the half assigned to agent-harness is "never read pass/fail out of log text".

It is stated nowhere else. `rg -uuu -in "log text|pass/fail|out of log|stdout.*verdict" domains/` returns nothing at all. The same search over `~/memory/findings/` returns nothing. `rg -uuu -in "log text|out of log|pass/fail" dirty/maybe-keep/` exits 1, so no seat has kept it.

The one other mention invokes it without carrying it. `dirty/skills/agent-harness/rulings/measurement.md:134` argues a general form from it — "It is the same defect as reading pass or fail out of log text, **which this domain already refuses**" — and does not state the rule it is resting on. That document is another quarantined source, queued for its own emptying. So a reader following the citation arrives at a document that assumes the rule and a domain that does not carry it.

The nearest live claims stop short. `domains/instrument.md` carries Negative Control, Population and Horizon, all about what an instrument must EMIT; this binds what a reader may TAKE from one, and the #16470 failure needs both. `domains/role.md` Verification is about reporting a check you did not run, not about misreading one you did.

The class is live. `findings/code-harness/` holds `worktree-existence-passes-by-substring-luck`, `deploy-passes-on-empty-workflow-set`, `check-help-claims-full-run` and `lint-verdict-measures-the-main-checkout` — four verdicts standing on something other than what they claim to have measured.

The ruling is kept under quarantine at `dirty/maybe-keep/skills/ci/rulings.md` with a composed rule for `domains/instrument.md`. Quarantine binds nobody, so this is filed to outlive that sweep either way.

NOT MEASURED: how many live tools read a verdict this way.
