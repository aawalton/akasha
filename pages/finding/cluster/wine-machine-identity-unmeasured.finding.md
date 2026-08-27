---
id: 202cef28-69f5-5796-bd2e-d628ad58bd6f
page-type-slug: finding
title: "Wine machine identity unmeasured"
domain-slug: page-type/cluster
---

# Claim

Whether a containerized game client presents a stable machine identity across pod restarts is unmeasured; if it does not, every restart authenticating to the same account looks like a new machine, which is the pattern that triggers publisher account-security holds, forced re-auth, or bans, and the Wine prefix's placement — persistent volume versus the container's ephemeral layer — is reasoned, not observed, to be the likely determinant of whether Wine's machine GUID survives a restart.

# Evidence

From project #16199 (domain: cluster). Evidence grade stated in the notes: "Nothing measured. This row is analysis and a design, not a finding." The identity-surface list below is reasoned from how Wine and Kubernetes work, not observed; every entry is a hypothesis, and the ordering by likely instability is a guess.

WHY THIS IS AN ACCOUNT-SAFETY PRECONDITION, not an optimisation: publishers track device/machine fingerprints for account security. If every pod restart looks like a brand-new machine authenticating to the same account, that triggers security holds, forced re-auth, and bans. Alan's account-safety policy applied to this rig's architecture.

CANDIDATE IDENTITY SURFACES, ordered by likely instability: hostname (pod name, changes on restart unless StatefulSet); MAC address (pod veth, changes on restart by default in k8s); /etc/machine-id (depends on image build); Wine machine GUID (registry inside WINEPREFIX — the likely crux); volume/disk UUID (stable iff on the persistent PV); CPU/GPU identifiers (host hardware, stable).

DESIGN CONSTRAINT NAMED: put WINEPREFIX on the persistent volume, not the ephemeral container layer — cheap at build time, expensive to retrofit after an account is flagged.

PROPOSED EXPERIMENT, not run: collect identity surfaces twice and diff; empty diff means stable, non-empty diff names what must be persisted. Named control requirement: assert the collector returned a non-empty inventory before trusting the diff, and perturb one known-unstable field to confirm the diff can fire.

SEQUENCING: deliberately not dispatched. The Wine-layer half needs S2's (#15808) container to exist first; the pod-level half (hostname/MAC/machine-id) is testable today and cheap for S2's worker to absorb once its image exists. Dispatch trigger stated: S2 lands a working container.
