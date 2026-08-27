---
id: df4cdd54-0595-5395-a30e-536750726d87
slug: amazon-confirmation-location-wrong
page-type-slug: finding
title: "Amazon confirmation requests report a consistently wrong location, so it is no evidence of another person"
domain-slug: domain/alan-email
---

# Claim

Amazon's account-confirmation requests report a location that is consistently wrong, so the location line in one is not evidence that somebody other than Alan is contacting Amazon.

# Evidence

Observed 2026-08-17. A message from `account-update@amazon.com`, subject `amazon.com: Account confirmation request`, reached the handler under the `amazon-other` agent rule at 23:14 UTC. It read: "Amazon Customer Service wants to confirm you're contacting us", with `When: Aug 17, 2026 04:14 PM Pacific Daylight Time`, `Device: Generic Mobile`, `Near: Oregon, United States`, and an approve-or-deny link on `https://www.amazon.com`.

The handler surfaced it to Alan as probably hostile, resting on the Oregon location against Alan being at his workstation in Utah.

Alan answered that it was probably Jen, that doing nothing either way is safe because she reaches it from his mail if it is hers, and that "the location for those is consistently wrong."

So the mail still needs him — it is left in the inbox rather than archived, which is what the surfacing was for. What the location does not support is the alarm: raising one from a mismatched location will misfire on every future request of this shape, and the same handler will read the same three lines the same way each time.

Not measured: how many such requests have arrived, nor whether any carried a location that matched. Only this one was read, and Alan's "consistently" is his reading of the run rather than a count taken here.
