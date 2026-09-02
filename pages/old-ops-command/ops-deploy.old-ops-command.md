---
id: 5d1e5505-5810-5ece-97af-29ba4fb5c19f
page-type-slug: old-ops-command
title: "Ops deploy"
slug: ops-deploy
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/global/deploy/deploy.command.code.attachment.ts
path: deploy
irreversible: true
---

# Definition

- **Ops deploy** — one named service put into production from the manifests its own synth emits.

# Help

Put one named service into production from its own synth.

ONE SERVICE, NAMED BY ITS PAGE SLUG. What the deploy is made of is not on the call: the synth that emits the service's workload is found by matching the kind, name and namespace its page states, and everything that synth emits goes together. A service no synth emits is REFUSED, and so is one two synths emit, rather than guessed at.

THE ORDER IS THE DEPENDENCY ORDER: the namespace first, then the configuration and secrets placed in it, then the workload that reads them. The manifests are written beside their own synth.ts before anything is applied, so what reached the cluster is on disk to read back. The apply is server-side and takes the field ownership it needs. Where the workload is a Deployment, StatefulSet or DaemonSet, the deploy waits for its rollout rather than returning on the apply.

A SERVICE THAT BUILDS IN ITS POD IS BUILT AND RESTARTED HERE, and every web app that names it is then told the commit it is live at, so a browser holding an older bundle is offered the reload.

WHAT WAS APPLIED IS REMEMBERED, under a mark taken over the manifests themselves rather than over the code that emitted them, so anything a synth read without importing it still moves the mark. A service the cluster is already running from exactly these manifests applies nothing. A service the cluster has lost is applied whether or not its manifests moved.

THIS IS NOT `ops service`, which starts and stops the systemd units of a workstation service. A workstation service is refused here.
