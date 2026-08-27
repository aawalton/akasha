---
id: c938a7f0-087e-54b2-9ec9-2b92d253b621
page-type-slug: finding
title: "Browser tier fails unreported"
domain-slug: domain/code-quality
---

# Claim

Twenty-two browser tests fail on the workstation, in a tier CI does not run by design, so nothing reports them and nobody knows how long they have been red.

# Evidence

Found by the seat delivering #18826 on 2026-08-12, which ran all 17 web browser-test files (43 tests, against the deployed app) to prove its own deletion had not left a row behind. Twenty-two failed — reader, block-editor, edge-swipe and listen-panel suites. `reader-pager` fails the same way in isolation, timing out after 60 seconds on `article h1`.

They are not that project's doing. The only web file across the deploy window's three commits is the browser test it deleted. It left them alone rather than repairing or working around them, which was right.

Amy checked whether the tier runs in CI. It does not, and that is declared rather than accidental: `packages/infra/checks/src/lib/test-step-paths.ts` enrols `unit`, `property` and `component` and names `browser` among the seven that are CI-incompatible by design, running instead on the workstation touched-file slow-suite gate.

So the failures are not a CI gap. What they are is a tier whose only reporter is a person choosing to run it. A suite that fails silently for an unknown length of time is indistinguishable from one that passes, and the cost is paid at the moment somebody trusts it — which is exactly what #18826 had to do to prove its own work.

What is not known and would settle what this means: when these last passed, and whether the slow-suite gate would have caught them had anyone touched those files.
