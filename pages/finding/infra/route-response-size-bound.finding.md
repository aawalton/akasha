---
id: fbc71193-7b76-5d4e-9d6e-e2b9f2c2c316
page-type-slug: finding
title: "Route response size bound"
domain-slug: domain/global
---

# Claim

Project #17909 (domain `infra`, status someday_maybe) proposes a per-route bound on response size so a slow or hostile client cannot drive any route past a stated limit, but neither objective is checked, the design is not yet defined, and even the target route population is unsettled — this row's own read counts ten, while #17887's handback counted eleven.

# Evidence

Project #17909, domain `infra`, status someday_maybe, live-on deploy.

Objectives (both unchecked):
1. A slow or hostile client cannot drive any of these routes past a stated bound — each site names the largest response it will produce, and the number is derived from what its own callers ask for rather than picked.
2. The bound is defended against being lowered into the failure it prevents — where a client re-requests on rejection, the floor that makes the guard safe is recorded at the constant and asserted, as #17887 did for the 16 KiB pmtiles floor.

Notes: Not yet defined.

Settle the population first: this row's read says ten, #17887's handback said eleven.

Overhead measured is about 2.5x the payload per in-flight response, so a cap of N costs roughly 2.5N per concurrent slow reader. The bound is per-request and concurrency multiplies it, which a per-route number alone does not answer.

`maxRequestBodySize` is worth checking at each boundary too. #17887 found Bun's 128 MiB default standing on atlas — within a hair of that container's entire 256Mi limit, and applying to every route whether or not it read the body.
