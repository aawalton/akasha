---
id: 3c313c50-b2e1-5cfb-9668-1765bbf2b7a5
page-type-slug: finding
title: "Fix tags before lifecycle exemption"
domain-slug: domain/global
---

# Claim

Project #18678's image-tag work is blocked only by ordering: the lifecycle-keyed exemption cannot land while 32 floating tags run on long-lived workloads — including the CI orchestrator and git transport that perform deploys themselves — so the 32 must be fixed to a tag first, proven on their own deploy, before the lifecycle keying lands and starts refusing them.

# Evidence

Project #18678 (status `awaiting_worker_seat`, `live-on: deploy`, domain `infra`, initiative `code-check`). Objectives, unchecked: (1) every long-lived workload names its image by a fixed, manifest-reproducible tag; (2) the image-tag gate's exemption keys on lifecycle, not image name, so a new short-lived workload needs no name-list edit; (3) the orchestrator and git transport still get a runtime image, confirmed by a real deploy.

Split out of #18512 by dalla on 2026-08-10; #18512's measurements carry here rather than being re-derived. #18512 keeps its two delivered objectives and closes; this row carries what it could not land.

Taken out of tree #18484 (~130 children, one branch/CI run/deploy): this alters how the CI orchestrator gets its runtime image, the deploy machinery itself — a failure here could take out the runner, not just fail as one more child. It gets its own branch, CI, deploy.

Not a check repair: lifecycle-keying the exemption would refuse 32 floating tags on long-lived workloads today — about 30 `cluster/bun-git:latest` (8 Deployments, incl. CI orchestrator & git transport), `cluster/temper-watcher:latest`, `cluster/voice-infer-cu121:serving` (each 1 Deployment), and 7 `cluster/ci:latest` (CronJobs). `BUN_RUNTIME_IMAGE` marks that tag deliberate: content-hash built, then re-tagged to a stable tag.

Counts read 2026-08-10 (cluster moves; re-measure): 32 corrects the splitting seat's 31 (missed `cluster/voice-infer-cu121:serving`), CronJobs 7 correcting 6.

Already done under #18512 on `project-18484`: the floating-tag judgement is now derived: a fixed tag is an optional leading letter then a digit; the denylist and accept-all fallback are gone. Verified over 19 tag spellings and a planted tree, green on 332 of 332 k8s docs/dockerfiles.

Order matters: fix the tags first, proven on a deploy that the orchestrator and git transport still start; only then land the lifecycle keying, or the gate refuses 32 live workloads and blocks everyone.
