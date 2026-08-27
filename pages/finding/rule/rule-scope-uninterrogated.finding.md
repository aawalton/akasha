---
id: 6b1e1875-b4ce-5e94-aee6-4ff3bc202b3f
page-type-slug: finding
title: "Rule scope uninterrogated"
domain-slug: domain/global
---

# Claim

The discriminating-instrument rule (a nonsense expect-text must return INDETERMINATE, not PASS, or the negative is not evidence) has been independently ratified three times for three different instruments — browser probes, deploy gates, greps — by three unaware authors, and none of the ratified rule documents in `~/.claude/CLAUDE.md` or `.claude/docs/` record whether their stated scope is the widest set the rule is actually true of.

# Evidence

Project #15991 (domain `rule`). Carried no objective — captured but never defined; this is its capture, moved off the row's retired `notes` attribute on 2026-08-15.

Origin: #15872 Temper M1 sweep (nimue + ember, 2026-07-25). Not Temper-specific — about the global/functional principle docs.

Triggering discovery: the discriminating-instrument rule was already ratified as the browser-probe standard (#15939 ran it; #15940 ran and used it, refusing to claim either way when control and real strings both returned INDETERMINATE) but never carried to any other instrument — five agents ran hundreds of greps that night with no control. The rule was scoped to the instrument that motivated it.

The general defect: a claim whose scope is narrower than its expression. An aggregate's scope is the members touched, its expression says "the set"; a grep negative's scope is the path searched, its expression says "does not exist"; a ratified rule's scope is the instrument written for, its expression says "our practice." Every rule the sweep produced is "carry the set" specialised to one claim kind.

Work framed (not carried out): for each ratified rule in `~/.claude/CLAUDE.md`/`.claude/docs/`, find its widest true set, then widen the statement or record why the narrow scope is correct.

Candidates named, source-reasoned/unverified: discriminating-instrument (plausibly every instrument returning a negative); reachability invariant (unclear if applied to status words like "FIXED"/"done"); boundary parsing (unclear on values crossing agents); SHA-carrying on negatives (unclear if carried to DB queries).

Addendum (ember via nimue): a third ratification found in `.claude/docs/deploy-gate-acceptance.md` (two-sided proof required for deploy-gate changes). Ratified three times, three instruments, three unaware authors.

Related: #15999 (code-harness), this row's sibling — that asks whether an exception's justification still holds, this whether a rule's boundary was ever justified.
