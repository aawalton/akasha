---
id: ec8bac0c-3deb-59af-8adf-7bc5e13e7468
slug: agent-tests-typechecked-by-nothing
page-type-slug: finding
title: "Agent tests typechecked by nothing"
domain-slug: domain/global
---

# Claim

Test files in `packages/agents/devops-monitor` are typechecked by nothing. Its `tsconfig.json` excludes `**/*.test.ts`, and no other build picks them up — not the root build, not the service build. Unsound fixtures therefore stand indefinitely without any check reporting them.

# Evidence

Found on 2026-08-16 while repairing the subscriber-lag guard, not by looking for it. The exclusion became visible only when a file-length limit forced fixtures out of a `.test.ts` file into a plain `.ts` one, at which point they were typechecked for the first time and were wrong.

Two faults had been standing in those fixtures: `baseSnapshot()` was missing two required `Snapshot` fields, `appDeployExpectations` and `liveSeats`; and `Snapshot["subscriberLag"][number]` is not a valid index, `subscriberLag` being nullable. Both are the kind a typecheck catches immediately and a passing test suite never does.

Those two are fixed on branch `project-19262`. The same unsound fixtures still stand in `subscriber-grace.unit.test.ts`, invisible for the same reason.

What makes this worth filing rather than fixing in place: the exclusion is in the package config, so it holds for every test file in the package and for any test file added later. The two faults found are what one accidental move surfaced, not a measurement of what is there.

NOT ESTABLISHED: whether other packages carry the same exclusion. Only this one was read.
