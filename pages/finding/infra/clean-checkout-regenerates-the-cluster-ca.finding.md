---
id: c0b63329-bac7-5c14-9b64-7703e0655800
slug: clean-checkout-regenerates-the-cluster-ca
page-type-slug: finding
title: "Clean checkout regenerates the cluster ca"
domain-slug: domain/global
---

# Claim

A clean checkout of the repo regenerates the cluster CA over the tracked `ca.crt`, silently, on the first run of `packages/infra/k8s/certs/generate-certs.sh`.

# Evidence

The generate branch is guarded at line 101 by `[[ -f ca.crt && -f ca.key ]]`. `packages/infra/.gitignore` ignores `k8s/certs/*.crt` at line 5 and then un-ignores `ca.crt` at line 7, deliberately — the cluster CA is a public root distributed to every workstation so TLS to in-cluster services verifies. `ca.key` stays ignored.

So on a fresh clone `ca.crt` is present and `ca.key` is not, the guard is false, and the script writes a NEW cluster CA over the tracked one and signs the PgBouncer certificate with it. Every workstation carrying the old root then fails to verify, and the repo's tracked copy is the new CA rather than the cluster's.

Measured twice on 2026-08-11, both times by accident: #18684's developer hit it on its first probe run, and the parent of tree #18682 hit it again running the script from a `git archive` of that tree's base commit. Reproducible on any checkout that has never run the script.

It blocks no run and raises nothing — the script exits 0 and reports success. What it costs is paid later, by whoever trusts the tracked root.

Two shapes a repair could take, neither chosen here: guard on `ca.key` alone, since that is the file whose absence actually means no CA is present; or refuse outright when `ca.crt` is present and `ca.key` is not, on the grounds that a checkout holding one and not the other is not a state the script can safely resolve by guessing.

Found while verifying #18684 under tree #18682, outside that row's objectives.
