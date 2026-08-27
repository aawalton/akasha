---
id: 4e8b0cce-8972-5742-8434-c2f7093d0621
slug: app-intent-surface-set-unestablished
page-type-slug: finding
title: "App intent surface set unestablished"
domain-slug: domain/global
---

# Claim

`check-app-intent-brand-words` scans four App-Intent surfaces — `IntentDescription`, `title`, `shortTitle`, `phrases` — and nothing in the record establishes that these are the surfaces Apple's upload validator rejects on. Only the description is tied to observed behaviour, by ITMS-90626 on build 157 (#16109). No upload in the record tests the title, the short title or the phrases, and no Apple-published list says whether a fifth surface is read.

# Evidence

Found while verifying project #18413, which widened the check to read every Swift quoting form and every binding form of those four surfaces. The widening is sound and the live seam is clean under it; what it cannot settle is whether the set of four is the right set.

Driving the rule core over a planted seam: `DisplayRepresentation(title: "…Apple…")` is refused, and `DisplayRepresentation(subtitle: "…Apple…")` is silent. `READ_CONSTRUCTS` names two construct kinds, `struct …: AppIntent` and `AppShortcut(…)`, so an `AppEntity` added to the seam tomorrow carries its literals to Apple unexamined while the run exits 0.

The check's own `predicate-derivation` annotation states the position honestly: Apple publishes no machine-readable list of the metadata ITMS-90626 reads, so the four are an open sample rather than a derivation.

Settling it wants either research into Apple's validator or a deliberate upload, which spends an App Store Connect build number.
