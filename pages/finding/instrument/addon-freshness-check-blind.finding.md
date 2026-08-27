---
id: e8e0530e-396c-5eb3-bb98-a8a2aa22165b
slug: addon-freshness-check-blind
page-type-slug: finding
title: "Addon freshness check blind"
domain-slug: domain/instrument
---

# Claim

The documented post-deploy freshness recipe for addon work includes an `ls -la` plus install-manifest-SHA check that is a non-discriminating instrument: every Temper addon directory continues to read a stale pre-land timestamp and SHA even when the delivered bytes are confirmed post-fix by the recipe's separate grep-for-a-new-symbol check, so the freshness half can never return a positive and its negatives carry no evidence.

# Evidence

Project #15996 (domain `instrument`). Carried no objective — captured but never defined; moved off the row's retired `notes` attribute on 2026-08-15.

Origin: found by #15972's worker during its own post-deploy verification (nimue relaying, 2026-07-25). That worker nearly reported its own landed, CI-green, artifact-verified change as undelivered on this signal.

The defect: the addon post-deploy recipe verifies freshness two ways — `ls -la` on the installed file, and a grep for a newly-added symbol. The grep half is sound and settled verification here. The `ls -la` half is a broken oracle: every Temper addon directory still read 02:29-02:55, and the install manifest still recorded the pre-land SHA, while the delivered bytes were unambiguously post-fix.

Why it matters: a freshness check that reads stale on a genuinely fresh artifact cannot return the positive, making it non-discriminating (the class project #15991 exists for), so its negatives are not evidence. An agent trusts it and falsely reports a landed change undelivered, or learns to ignore it and the recipe carries a step nobody believes.

Direction: errs alarming (undelivered when delivered), which is why it surfaced within one deploy, consistent with the direction-of-bias asymmetry on #15872.

Work framed (not carried out): (1) establish why the timestamp/manifest are stale — install path not rewritten, manifest written before copy, or copy elsewhere — before fixing the recipe. (2) Repair the signal or delete that half, keeping the grep; deletion is a legitimate outcome. (3) Apply the #15991 test to any replacement: prove it can return the positive, on a known-fresh and known-stale artifact.

Ownership: whoever owns the addon post-deploy recipe doc; filed to nimue pending identification, to be re-homed.

Evidence grade: source-reasoned plus one observed instance, independently confirmed by reading the installed bundle at lines 7719/7747. Not established whether this affects non-Temper addons.
