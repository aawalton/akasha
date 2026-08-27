---
id: fbd7561b-0cb8-5cc5-a1cb-9e6f15dd36b9
page-type-slug: finding
title: "Live corpus walk outgrows its ceiling"
domain-slug: domain/test
---

# Claim

The live-corpus walk in `packages/agents/shared/project-binding.unit.test.ts` failed one branch CI run on its 240s ceiling and passed the next at the same commit, nothing having changed between them. The walk asks one subprocess per domain per role over the live instructions corpus, so what it costs is set by how many domains stand, and domains are added faster than this ceiling is revisited. Its header already records being raised from 60s for the same reason, and already names the cure.

# Evidence

Pipeline 28127 on 2026-08-15, branch `project-19231`, step `check/check-unit-tests`: the walk timed out after 240000ms. One failure in the run; 1904 of 1905 in that workspace passed. Pipeline 28128 then passed at the IDENTICAL commit, `adba990`, nothing in the tree having changed between them. Both reported `capacityWait.nodes: node-06`.

So the walk is not reliably over its ceiling. It fails on some hosts under some load and passes on others.

The file measures 116.7s whole on the workstation, 36 tests all passing, on 2026-08-15. Its header records 29.1s for the walk on 2026-08-12 and 14.3s on 2026-08-09, and records being raised from 60s after timing out in pipeline 27881. The workstation reading was taken on the shared box under unknown load and does not part the walk's cost from the file's.

`domains/test.md` Delete Rather Than Repair holds that a failure clearing on a re-run is a test failing while nothing is wrong, and that such a test is deleted rather than repaired. Raising the ceiling a third time is the repair that rule refuses.

What the walk guards is real: a role rename once left every seat parsing to no seq with every surface reading healthy. So deleting it costs that ratchet, and the header names the cure that would cost neither, one call carrying every question where this walk asks 300-odd separately.
