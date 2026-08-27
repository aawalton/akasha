---
id: 01a0457e-2bd9-7000-8f21-1779c7f8e78d
page-type-slug: command
title: "Deploy"
slug: deploy
path: deploy
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/command
  - domain/deploy-system
---

# Definition

- **Deploy** — one named service put into production from the manifests its own synth emits.

# Design

A call names one service, and the name is the slug of its page.

Which manifests a service is made of is read from the synth that emits its workload, never named on the call.

A service no synth emits is refused.

A service more than one synth emits is refused.

A workstation service is refused here.

The namespace is applied before anything placed in it, and the workload after everything it reads.

A deploy waits for the rollout of a workload that has one.
