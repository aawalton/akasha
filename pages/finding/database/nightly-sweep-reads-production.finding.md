---
id: 76c9bd03-fb74-532c-b435-fa94aef02fe4
page-type-slug: finding
title: "Nightly sweep reads production"
domain-slug: domain/database
---

# Claim

The nightly slow-suite sweep reads the production Supabase database with a service-role key, unattended, and which suites do it is decided by an import rather than by anyone choosing it. `packages/infra/ci/slow-suite-sweep/k8s/synth.ts` gives the CronJob pod `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `pipeline-engine-secrets`, and any `.database` suite reaching `installPageTypesFromLive` builds a service-role client out of exactly those. Nothing at the call site shows the cadence.

# Evidence

FOUND WHILE INGESTING `dirty/knowledge/database-test-lane.md`, whose second Mechanism subsection states this. The subsection was cut from that source for stating no act a rule could carry; the observation is filed here rather than lost with the sweep that will remove the source.

MEASURED IN `~/code` AT INGEST. `packages/infra/ci/slow-suite-sweep/k8s/synth.ts` sets `CI_SECRET_NAME = "pipeline-engine-secrets"` at line 60 and, at lines 184–190, wires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` into the CronJob pod's environment by `secretKeyRef` against that secret. `packages/shared/supabase/test-harness/src/install-from-live.ts` line 60 calls `createClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_SERVICE_ROLE_KEY"), …)`. The two env var names are the same pair, so the seeder inside a swept suite reaches live with a service-role client.

WHY THE SWEEP REACHES THESE SUITES. `packages/infra/tests/src/select-slow-suites.ts` line 39 declares `SLOW_TEST_SUFFIXES = ["integration", "data", "cli", "database"]`, and the nightly sweep runs that set. `packages/shared/supabase/test-harness/src/install-from-live.database.test.ts` carries the `.database` suffix and sits in the same directory as the seeder.

WHY ENROLMENT IS BY IMPORT. Nothing marks a suite as production-reaching. A suite is swept because of its file-name suffix and reaches production because of what it imports, and neither fact is stated at the other's site. An author picking `installPageTypesFromLive` because it is the convenient way to get page types into pglite is choosing a live read, which the function's name does say; the nightly unattended cadence is the half no call site shows.

WHAT WAS NOT MEASURED. Whether the reads are in fact read-only in every path, what load they place on production, and whether anyone intended the CronJob to hold a service-role key at all rather than a narrower one. Each needs a decision rather than another measurement, which is where this finding stops.
