---
id: e94c1ccb-890b-533d-857b-e7bbebd438a1
slug: cert-manager-condition-unsettled
page-type-slug: finding
title: "The cert-manager alert documents describe expiry closeness while their rules detect a missed renewal"
domain-slug: page-type/alert
---

# Claim

The two cert-manager alert documents describe closeness to expiry, while the rules that fire them detect a renewal cert-manager missed against its own schedule.

# Evidence

`domains/alerts/cert-manager-cert-expiring-soon.md` and `domains/alerts/cert-manager-cert-expiring-critical.md` are the only two alert documents whose rules kept their words inline in the synth rather than taking them from the `alerts-all` page query. They were left that way deliberately, because moving the words would have delivered the wrong sentence.

The rules are named `CertManagerCertRenewalOverdue` and `CertManagerCertRenewalOverdueCritical`. A renewal being overdue is cert-manager having missed its own renewal schedule, which is a fault in the renewer. Proximity to expiry is a property of the certificate and can be true with the renewer working correctly, and it is what the document slugs say. The two come apart exactly when it matters: a certificate can be far from expiry with renewal already overdue, and close to expiry with renewal proceeding normally.

The pages were renamed to the expiry wording on one side only, so the rule names and the slugs have disagreed since. Settling which of the two the condition is decides both the slug and the words, and the words then move like every other pair.
