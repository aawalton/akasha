---
id: 1dfdde2d-3a03-5ad0-8006-be5357e3037b
page-type-slug: finding
title: "Rule corpus narrower than deleted page"
domain-slug: domain/alan-email
---

# Claim

Alan's rule corpus is narrower in two places than the rule page it replaced, and the page that held the difference is gone.

# Evidence

Found by the worker on #18797 while checking that `~/agents/amy/email-rules.md` was safe to delete, and recorded here because that page no longer exists to be compared against.

`marketing-senders.md` carries no spotify, comms.runwayml.com, email.github.com, kickstarter.com or leapevent.tech. `amazon-purchases.md` dropped the return, refund and cancellation subjects.

Both narrowings fail safe: mail that no rule matches surfaces rather than files, so the cost is Alan seeing mail he would rather not have seen, never mail filed away unseen. Four other apparent losses were run down on the same pass and all four dissolved.
