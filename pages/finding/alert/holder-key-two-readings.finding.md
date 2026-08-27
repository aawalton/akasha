---
id: 03fc4a39-7d73-568e-98d2-d2739735d1f6
page-type-slug: finding
title: "Holder key two readings"
domain-slug: page-type/alert
---

# Claim

The Intent line `Every alert names the person or persona it reaches.` on `domains/alert.md` is already true of alert documents and not yet true of alert firings. Every document under `domains/alerts/` carries exactly one of `person:` or `persona:` and the schema requires it; nothing reads either key back into a route when an alert fires. That document's Definition makes an alert the message, so the two readings disagree over whether the entry is met and so over whether it should leave.

# Evidence

Reported by the reviewer seat `claude-alert-archivist-review-instructions` in its line-by-line reading of `domains/alert.md` on 2026-08-13; its report is at `~/agents/claude-alert-archivist-review-instructions/review-alert.md`.

I did not re-run the schema check, the document count, or the search for a reader of `person:`/`persona:` — the ambiguity is taken from that seat's report rather than measured here.

Not measured: which reading Alan intended. He rewrote this line and the one beneath it in `89f842611` on the day of the reading, collapsing a pair that had previously kept the document and the firing apart, so the collapse may itself have been the decision.
