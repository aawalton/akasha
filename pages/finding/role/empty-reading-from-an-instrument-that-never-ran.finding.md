---
id: 733b407e-6f4a-5ae3-9d5a-32a5b1bc4093
slug: empty-reading-from-an-instrument-that-never-ran
page-type-slug: finding
title: "Empty reading from an instrument that never ran"
domain-slug: page-type/role
---

# Claim

Two instruments returned nothing to me in one session and neither had run, and in both cases the empty reading was one step from becoming a fact I reported.

# Evidence

`bun tools/checks/links-resolve.ts` produced no output, and I told my principal that settled a question about which links the standing check flags. The file is a module exporting `linksResolve: Check` with no `import.meta.main`, so nothing in it executed. Chasing the silence is what surfaced the report truncation repaired at `5ae43b1c74`.

`bun ops pipeline step-cost --step modularity --limit 20` returned `runs 0`, which reads as a step that has never run. The same verb against `typecheck` also returned `runs 0`, which cannot be true of a monorepo that typechecks every crossing. Step names carry a `check-` prefix: `--step check-modularity` returns 60 runs, `minMs 445`, `medianMs 1225`, `maxMs 1993`, with rows on pipelines 27042 through 27054. The first reading was the verb finding no such step, and it is shaped exactly like the reading that the step is free.

`domains/role.md` carried a principle naming this failure until commit `baebd84a` on 2026-08-05 took it off that surface. It stands on `domains/instrument.md` as Negative Control, beside a rule Population that obliges an instrument to state what it measured, and `domains/code-check.md` names `instrument` as a parent. Both readings above are from the session between the two, and the second was caught by holding the principle rather than by either surface.
