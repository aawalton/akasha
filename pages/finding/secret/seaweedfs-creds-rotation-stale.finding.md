---
id: 74eeef78-1d68-5c7d-8c60-3a5a369d4e57
page-type-slug: finding
title: "Seaweedfs creds rotation stale"
domain-slug: domain/secret
---

# Claim

Rotating secret/seaweedfs-creds does not roll several of its mirrored consumers because the mirror step copies the new credentials in without changing anything the consumer's own skip-gate or restart trigger inspects, so those consumers keep serving the old credentials indefinitely until they happen to restart for an unrelated reason, at which point they alone disagree with the rest of the fan-out.

# Evidence

Project #16405 (someday_maybe, secret), captured by aranya 2026-07-26 while worker-16399 fixed the gateway half (#16399); this is the larger fan-out half.

secret/seaweedfs-creds: generated in-cluster from /dev/urandom by seaweedfs's ensure-creds-secret step (create-once, no sops file or manifest) — rotation changes nothing ci.inputsHash can see. Mirrors to five consumers: loki (loki-s3-creds), headscale, postgres (CNPG Barman), gfs-promoter, annual-dump.

Measured on loki: loki-apply (loki/service/foundation.workflow.ts:86-98) is skip-gated on CONTENT_HASH from ci.inputsHash. LOKI_HASH is md5sum of configmap.generated.yaml, excludes credentials. Loki mounts loki-s3-creds with -config.expand-env=true: keys expand from env at pod start, and env-from-secret never hot-updates (same fact as #16335's subPath-never-hot-updates). Rotation updates the secret but not configmap, LOKI_HASH, or the pod-template annotation, so the pod never rolls; loki serves old credentials indefinitely.

Looks fine today because nothing rolls: participants agree on stale credentials until one restarts and gets them alone. #16399 (fixed deliberately) changes the timing: the gateway now rolls correctly and alone moves to new credentials, making it immediate not latent — rotation stays unsafe fleet-wide until this row lands.

General rule (worker-16399): a missing sed does not fix this class: skip-gating on synth inputs means out-of-band config never touches the gate; the fix is a hash plus unconditional apply (cloudflared, #12027).

Scope: for each of the five consumers that does not roll, add a live-content hash plus unconditional apply; sanity-check presumed-rolling ones (postgrest, electric, supabase-realtime); prove acceptance by the pod-template annotation changing when the secret changes.

Related: #16399, #16335 (same class), LANDED-NOT-LIVE family. Sharpened 2026-07-26T03:48Z by worker-16399, who verified loki live and found a third shape the filer had collapsed into a second.
