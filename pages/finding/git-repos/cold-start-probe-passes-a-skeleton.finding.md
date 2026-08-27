---
id: 4bf593b2-5fc4-57cd-ade2-1cc146b9b464
slug: cold-start-probe-passes-a-skeleton
page-type-slug: finding
title: "Cold start probe passes a skeleton"
domain-slug: domain/git-repos
---

# Claim

The git-transport cold-start probe cannot detect the state its own comment says it catches. `init-bare-repo` tests the SSD bare repo with `git -C "$CODE_REPO" rev-parse HEAD`, which exits 0 on a repo that has objects but no refs, so the wipe-and-re-clone branch beneath it never fires for the skeleton clone it was written for. Only `rev-parse --verify HEAD` exits non-zero on that state.

# Evidence

Read 2026-08-07 in `~/code`.

`packages/infra/git/transport/k8s/synth-deployment.ts:108-118`, inside the `init-bare-repo` init container script:

    # Cold-start: if the SSD bare repo is missing or unreadable, clone from
    # the GitHub mirror. The probe is `git rev-parse HEAD` so a partial
    # failed clone (skeleton .git/ with empty objects/) is detected and
    # re-cloned fresh.
    if git -C "$CODE_REPO" rev-parse HEAD >/dev/null 2>&1; then
      echo "init-bare-repo: $CODE_REPO already present, skipping clone"
    else
      if [ -e "$CODE_REPO" ]; then
        echo "init-bare-repo: $CODE_REPO exists but HEAD unreadable — wiping partial state"
        rm -rf "$CODE_REPO"

The comment states the probe's purpose — detecting a partial clone — and the probe does not have that property. Without `--verify`, `rev-parse HEAD` resolves `HEAD` as a name and prints the literal string on a repository with no refs, exiting 0. So the `else` arm holding the wipe is unreachable for exactly the case the comment names, and a skeleton repo is reported as "already present, skipping clone".

Nothing else in the container re-checks. The pod then serves pushes against a repo that passed a probe designed to reject it.

Where this came from: `dirty/skills/infra/findings.md` recorded it 2026-07-27 with the probe observed in-pod at git 2.49.1 and on the workstation at 2.55.0. I re-read the source today and confirmed the probe and the comment are unchanged; the line numbers in that record (77-80) have shifted to 113-118.

Not established: I did not run the probe against a ref-less repository myself, and I did not observe a skeleton clone in the pod. The claim rests on reading the script and on `rev-parse`'s documented behaviour, not on a controlled observation of my own.
