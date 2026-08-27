---
id: 6ce6af20-1948-55bb-966b-530337b8b641
page-type-slug: finding
title: "Installed build unreported"
domain-slug: domain/ios-install
---

# Claim

Nothing reports which build a device is actually running, so a report that an installed change did not appear cannot be told apart from a change that never reached the device.

# Evidence

Met on 2026-08-10 verifying #18241. Alan installed TestFlight build 176 and reported the three stoplight tiles had not changed. Everything reachable from this workstation said the change was live: `c1ad903aaa`, carrying both the widget and the three routes, is an ancestor of `977e7d5a3e2f`; `ops mobile cut-status` names that SHA as build 176's; the project's deploy record carries the same SHA; and an authenticated round-trip against the deployed bundle returned `reading`, `nextTier` and `progress` on all three endpoints. His device secret had been accepted at 14:14Z, minutes before, so the phone was reaching the server and being answered.

What none of that settles is which extension binary drew the tiles. An old widget extension and a new one issue the same request to the same URL with the same `X-Device-Secret` header, so the server cannot distinguish them, and `device_secrets` records only `last_used_at`. The two live hypotheses — a stale extension on the phone, and a fault in the new drawing — are separated only by asking Alan what he sees, which makes him the instrument. `domains/readouts.md` states that Alan is never the instrument that catches a readout being wrong.

`ops mobile cut-status` reports what was CUT against `origin/main`, which is a fact about the build server rather than about any device. It answered "Devices current" throughout, and that reading is true and unhelpful in exactly the case that matters: it cannot see an installation that did not take.

A build identifier carried on the request, or recorded beside the credential when it is used, would separate the two hypotheses without a question. Whether that belongs on the device-secret row, on a header, or somewhere else is a design call rather than something this observation settles.
