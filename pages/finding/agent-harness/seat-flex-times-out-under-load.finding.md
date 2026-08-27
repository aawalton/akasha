---
id: 2adda62c-645b-5f61-983b-4da2ebea1b43
slug: seat-flex-times-out-under-load
page-type-slug: finding
title: "Seat flex times out under load"
domain-slug: domain/agent-harness
---

# Claim

`tools/tests/seat-flex.test.ts` fails or passes depending on how busy the workstation is, so `run-checks` refuses work that did not break it.

# Evidence

A seat delivering project #18948 reported `ops instructions run-checks` failing on `suite-runs` at `tools/tests/seat-flex.test.ts:162`, the case named "launchOf answers what the row holds, over whatever agent rows stand", timing out at bun's 5-second default against the live database. It reproduced for that seat in isolation, 9 pass and 1 fail. It had written nothing in the instructions repo, so nothing it did could have caused the failure.

Run here minutes later, the same file passed 10 of 10 three times consecutively, and a full `ops instructions run-checks` reported `suite-runs` passing over 405 test files and 5919 tests with no other failure.

What separates the two readings is load. The failing run was taken while two dispatched seats and one interactive seat were working; the passing runs while the dispatched pair had finished. The case reads live agent rows, so its duration is the database's to decide and the 5-second default is a fixed bound against a moving quantity.

The cost is not the flake itself but what it does to whoever meets it: a seat handing work back is told a check refuses, cannot tell a real refusal from this one, and either escalates something that is not theirs or repairs something that is not broken. The seat on #18948 escalated, which is right and still spent the run.

What settles it: the case standing under a bound it chooses rather than bun's default, or reading rows it does not have to fetch live. Either way the reading that shows it fixed is the suite passing while the workstation is under the load that failed it — a pass on an idle machine says nothing, which is why this was not caught before.
