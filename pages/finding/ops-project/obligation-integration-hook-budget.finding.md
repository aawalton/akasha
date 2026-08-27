---
id: 6831d71b-b5a9-5fc7-97cb-2954c2216616
page-type-slug: finding
title: "Obligation integration hook budget"
domain-slug: domain/global
---

# Claim

Two integration test files in the projects CLI report a hook timeout rather than a verdict whenever the machine is under load, so a run of them says nothing about the rule they exist to check: `src/project/move-to-obligation-gate.integration.test.ts` and `src/project/obligations-write-boundary.integration.test.ts`. What runs out of time is fixture cleanup in `beforeAll`, not the subject under test.

# Evidence

Measured on this workstation at `997aed4667f4756799833e6eabe47d830720beb2`, with the working tree clean. `hardDeletePages` filtering project pages by title takes about 3.5 seconds and `createPage` about 0.3, against a 5 second default hook budget — roughly three quarters of it spent before anything else contends for the machine.

Running the two files alone failed all four of their tests. Running them inside a 127-file sweep of `bun test src` failed three of the four, alongside 1171 passing. Each failure reads `a beforeEach/afterEach hook timed out for this test` at just over 5000ms.

The infrastructure the hook reaches is up: a REST call to the same Supabase project answered 200 in 595ms from the same shell moments before.

Neither file names any module deleted when the code repository stopped judging project handoffs, and the path they exercise is the page write trigger, which that work did not touch.
