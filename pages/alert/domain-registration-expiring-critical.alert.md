---
id: 15c115d0-4b3c-5838-b6b3-a78ec0c74cc7
page-type-slug: alert
title: "Domain registration expiring critical"
slug: domain-registration-expiring-critical
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Domain {{ $labels.domain }} expires in {{ $value | humanizeDuration }} (<7d)"
---

# Definition

- **Domain registration expiring critical** — a domain name's registration expires so soon that renewal has nearly run out of time.
