---
id: 1a5df28b-e2ad-5c9d-a974-58bb655aaf1c
slug: discard-untested-on-the-wire
page-type-slug: finding
title: "Discard untested on the wire"
domain-slug: role/handler
---

# Claim

An inbound from an unenrolled number is verified to reach nothing in the routing decision and in the tests, and has never been driven from a real handset over the wire.

# Evidence

Checked on 2026-08-11 against `8f79cee95f` on `main`, after the change landed.

The decision itself holds. Driving the landed `decideSmsRoute` directly, with an enrolled set of four and a deliberately hostile LIVE rule set carrying a catch-all that would route anything to a seat: an unmatched number discards against an empty rule set and against the hostile one alike, a number with no digits discards, the two enrolled and allowed numbers return their own handlers, a revoked number drops and an enrolled number naming no handler of its own refuses. Eight cases, all as specified, nothing mutated to get the reading.

What that does not reach is the wire. The webhook shell, the signature check, the identity load and the effect that records a discard are all upstream and downstream of the pure decision, and no inbound from an unenrolled handset has been sent through them. So the guarantee stands on the decision and on the suites around it, and the end-to-end evidence — no seat woken, no reply sent, and a body-less row appearing at `/sms-discards` — is not taken.

Only somebody holding a handset that no relationship row carries can take it.
