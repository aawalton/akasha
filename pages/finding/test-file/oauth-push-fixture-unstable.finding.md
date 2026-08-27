---
id: db6b9053-ffb9-5266-b273-592fc20b9d8e
slug: oauth-push-fixture-unstable
page-type-slug: finding
title: "the oauth page push tests rule differently on one unchanged tree"
domain-slug: domain/test-file
---

# Claim

`tools/tests/oauth-page-push.test.ts` returns a different result from run to run on an unchanged tree, so a run of it rules on nothing.

# Evidence

Four runs against one checkout of `fffa24e1e`, nothing between them: 5 pass 15 fail, then 18 pass 2 fail, then 18 pass 2 fail, then 20 pass 0 fail.

It is not the write-route change that made it so. `068a0e8f4` and `d4b3b559f` both carry that change whole and both ran 20 pass 0 fail, and `fffa24e1e^` ran 20 pass 0 fail as well.

The failures land on assertions about what a file still holds after a push — `it keeps whatever else the uncommitted file already holds` reads back `access-token-expires-at` where the case had just written `five-hour-percent-used`. The tests in the file run in sequence and each stands on the state the one before it left, so a fixture disturbed part way through fails the rest.

The cause is not settled. `ROOT` at line 7 is the fixed path `/var/tmp/oauth-page-push-test`, which every checkout on the machine shares and which module load erases with `rmSync` before rebuilding, so two runs anywhere would cross. That reading is unproven: eight concurrent runs, four at once in two rounds, and a run staggered a second behind another, all came back 20 pass 0 fail. Whatever disturbs the fixture was not reproduced on demand.

The failures were seen while the repository was taking commits from several seats at once, and not seen while it was quiet.
