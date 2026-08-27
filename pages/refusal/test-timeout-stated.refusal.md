---
id: 5d131530-feee-5822-9b7e-b3c1af9c93fd
page-type-slug: refusal
title: "Test timeout stated"
holes:
  - stated
  - ceiling
---

# Refusal

{stated} place(s) in the standard suite state a timeout of their own, so the runner's {ceiling}-second default does not bound them there. `bun test --timeout` does not override a stated one, which is why nothing else can put the ceiling back.

A test running longer than {ceiling} seconds is waiting on something a unit test should not be reaching, and one hanging behind its own ceiling spends the whole run's budget while reporting no failure. A test that drives its subject through a process it starts belongs in a `*.on-demand.test.ts` file, which this suite does not run.
