---
id: c89e27c3-a49c-52cd-9303-ca53d1650a6b
page-type-slug: finding
title: "Eso rig privilege gap"
domain-slug: page-type/cluster
---

# Claim

In the cluster domain, the ESO GPU-rig pod on node-03 (#15804/#15805) ran as root as of 2026-07-25 — no USER in the Containerfile, no runAsUser/runAsGroup/fsGroup, only privileged: true — masking that kubelet does not fsGroup-chown hostPath volumes. That becomes load-bearing once privileged mode is removed, by which point the ~100GB install volume would already exist and need a one-time chown. The project was stopped by Alan's full-project halt 2026-07-25, work committed and pushed.

# Evidence

Source: project #15808 (someday_maybe, live-on deploy, domain cluster), captured notes, no objective, moved off `notes` 2026-08-15. Reassigned to Aranya by nimue 2026-07-24 (folded into her node-03 slices, part of the #15804 ESO umbrella with #15805). Not critical path; sequenced after S1/S3 since render + injection couldn't be verified before /dev/uinput and the PVC existed.

Deliverable: a runnable node-03 pod rendering ESO on GPU, accepting ydotool injection. Design: base image selkies docker-nvidia-egl-desktop, not gamescope-headless (cursor bug). ESO via Steam Proton on the S3 PVC. ydotool+ydotoold over kernel/uinput; no xdotool (KDE gate). GPU+privilege via dcgm-exporter precedent. Guardrail: node-03 is an etcd member, so limits/QoS on this pod protect etcd from a client wobble.

De-privilege cost (nimue, 2026-07-25T15:47): Containerfile is FROM ubuntu:24.04, no USER/useradd; securityContext sets no runAsUser/runAsGroup/fsGroup/runAsNonRoot, only privileged: true. The rig ran as uid 0, writing a root-owned hostPath unaided. kubelet does not fsGroup-chown hostPath — inert while root, load-bearing once privileged: true comes off (the spec's own comment commits to that). By then /var/lib/eso-install holds a ~100GB install nobody wants to re-fetch; failure reads as ESO/Wine, not permissions. Flagged: send Aranya the uid for a chown.

Related, handed to the worker: the wineprefix hostPath declared type: Directory but /var/lib/eso-rig did not exist on node-06 (ENOENT, measured); precedent is DirectoryOrCreate.

Halt note (Aranya, 2026-07-25 ~16:37Z): Alan's full-project halt; áine, quoted: "You were the exception under the Temper pause. The full halt supersedes that: you stop too." State: committed and pushed, worktree clean, branch project-15808 @ 06685da1 (remote identical). HEAD: "fix(#15808): unblock the pod — DirectoryOrCreate for the prefix, move the account-safety guard where it fires." Pipeline 25905 live, capacity-starved, flagged must-not-retry.
