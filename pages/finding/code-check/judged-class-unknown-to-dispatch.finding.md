---
id: d34d9745-175c-5c5c-8737-bcc6a0a26724
page-type-slug: finding
title: "Judged class unknown to dispatch"
domain-slug: domain/global
---

# Claim

No instrument settles whether a registered check wakes on the change class it judges. Each check's judged class is stated in prose per check and is not machine-known, so a gate watching a class it never reads, or missing the class it does read, is green on the one event it exists for and reads identically to one that looked and found nothing.

# Evidence

Established by #18349, which was cut to enforce this over the estate and found it could not be. Deriving each check's judged class by static scan under-reports. Gating every tracked file that projects to a node type is unlandable at 722 violations of 16,933 members, and exempting the remainder by hand is the list `Derived Reach` forbids. #18349 therefore delivered the reachable half — a file class registered through every place dispatch reads, rather than most of them — and its criterion was redefined to that. The `Dispatch Reach` rule is what holds the rest, which is to say a rule read by whoever remembers it rather than an instrument.

TWO LIVE INSTANCES, both found after #18349 was written and neither charged to the child that surfaced it.

`check-addon-xml-handlers` judges a population that is entirely markup — 56 XML files, walked from the 49-addon roster — and its registry entry watches `{ kind: "ts-file", under: "packages/temper" }` alone. A commit editing an inline handler body and nothing else does not wake it. The gate was rebuilt by #18390, which removed a declaration discovery that had read 1,793 TypeScript sources; the mismatch predates that and was made total by it, since the old gate at least read the files it woke on. Traced by the verifying seat to the assembled `ADDON_CHECKS` that `checks.workflow.ts` dispatches, not to the registry module.

`check-addon-dependency-cycle` and `check-addon-dependency-floor` no longer wake on an edit to `addons-resolve`, which derives the roster they audit — filed separately at `pages/finding/code-check/roster-derivation-wakes-no-gate.finding.md`. That one is narrower: a manifest still wakes them, and only a change to how membership is decided slips through.

NOT ESTABLISHED. How many registered checks carry the mismatch. Nobody has counted, and counting is the thing this finding says no instrument does. The two above were each found by a seat rebuilding one gate and looking at what woke it, which is not a search anyone is running.
