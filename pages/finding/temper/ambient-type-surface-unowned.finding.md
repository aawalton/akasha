---
id: a7f1deb3-4377-5ae0-b4fe-24348a192871
slug: ambient-type-surface-unowned
page-type-slug: finding
title: "Ambient type surface unowned"
domain-slug: domain/temper
---

# Claim

The rename programme's shared ambient type-surface files — `packages/temper/addons/types/libs/*.d.ts`, each describing multiple libraries at once, and `packages/temper/addons/types/eso/*.d.ts` — have no batch that owns verifying the old naming was cleared from them, because rename batches are scoped per-library-directory while these files are shared across many libraries, so every batch treats them as another batch's responsibility and the union of "not mine" leaves them unverified.

# Evidence

From project #16198 (domain: temper). Found by #16187's implementer: the rename programme has a type-surface tail no batch currently owns.

Residual upstream/drop-in framing survives in the shared ambient type surface:
- `packages/temper/addons/types/libs/*.d.ts` — describing other batches' libraries: lib-map-ping, lib-custom-menu, lib-slash-commander, lib-saved-vars, lib-treasure, lib-addon-menu.
- `packages/temper/addons/types/eso/*.d.ts` — ~25 more files.

WHY IT FALLS THROUGH: each rename batch owns its own library directory plus inbound consumer edges. These files are neither — a shared surface describing many libraries at once — so every batch reasonably treats them as another batch's business, and the union of "not mine" is the whole file. A shared file split by subject rather than by owner has no owner; per-library batching makes each batch correct in isolation and leaves the intersection unassigned.

It should largely fall out as each batch lands its own library's edits. What has no owner is the verification that it did — and the ~25 files in `types/eso/**`, which are not per-library at all.

SEQUENCE: this is a closeout row for #16111, not a parallel one. Running it before the batches land would fight them for the same lines; run it after the last batch parks.

VERIFICATION METHOD NAMED: verify by absence of the old token per file, with a positive control (a not-yet-renamed library must still be found by the identical command) — the same discipline the #16116 pilot's partial doc update taught.
