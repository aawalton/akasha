---
id: 35f218b5-0697-5465-8a64-0d447c88f01b
page-type-slug: finding
title: "Scratch root unwritable under hardening"
domain-slug: domain/global
---

# Claim

Every hardened container in the estate makes `/var/tmp` unwritable, and the repository's own scratch ratchet routes TypeScript scratch to `/var/tmp`. Code subject to both — TypeScript that runs inside a hardened container — has no scratch path that satisfies both, and neither gate can see the other, so the disagreement surfaces at runtime rather than at either one.

# Evidence

Measured 2026-08-04 against the live cluster and `origin/main`.

Of 145 running containers, 83 set `readOnlyRootFilesystem: true`. Of those 83, zero mount anything writable at `/var/tmp`; the common shape is a writable `emptyDir` at `/tmp` alone, and some (cert-manager, cloudflared) carry no writable scratch mount at all.

`packages/infra/checks/src/lib/tmpfs-scratch-coverage.ts` holds the opposite convention for repository code: "Every detected file today can route to `/var/tmp`". Its `exceptions` value is typed `never`, so an exception costs a code change supplying a mechanically-decidable predicate rather than a data edit, and its `pending` arm is a shrink-only ratchet held by equality against `PENDING_SIZE`.

The check's population is narrower than the convention it states. `check-tmpfs-scratch` scans TypeScript and shell files; all 236 ratchet entries are `.ts`. It reads no manifest and cannot see a `securityContext`. Correspondingly, nothing on the manifest side is read against the scratch convention.

`seaweedfs-backup-bulk` is the case where both reach the same process. Its container sets `readOnlyRootFilesystem: true` with a writable `emptyDir` at `/tmp` only. It has failed every run since 2026-07-28 with `sorter: open /var/tmp/extsort_26_2309033285: read-only file system`, raised when rclone crossed its million-entry list cutoff and fell back to an external sort rooted at `/var/tmp`. `TMPDIR=/tmp` does not redirect it.

The sibling `seaweedfs-backup-longtail` carries the same securityContext keys except `readOnlyRootFilesystem`, which is absent, so `/var/tmp` is writable there and TypeScript rooting scratch at `/var/tmp` is correct as that container stands.

Not measured: whether any of the 236 ratcheted sites run inside a hardened container; how many of the 83 hardened containers run code that writes scratch at all; and whether the two conventions were ever authored in view of each other.
