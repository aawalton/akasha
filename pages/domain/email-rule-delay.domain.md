---
id: fa58c30c-f697-5629-8db0-787bd37fe279
page-type-slug: domain
title: "Email rule delay"
slug: email-rule-delay
domain-parent-slug: rules-engine-rule-set/email-rule
---

# Definition

- **Email rule delay** — how long after a piece of mail arrives before an email rule acts on it.

# Design

A delay is measured from when the mail arrived, not from when the rule was consulted.

A rule claims the mail when it matches, and the delay postpones only the acting.

A delay stands on the rule rather than on one of its actions.
