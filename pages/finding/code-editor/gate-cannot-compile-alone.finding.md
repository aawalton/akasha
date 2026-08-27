---
id: dee87a24-1640-5931-b7cc-30a772f5b81a
slug: gate-cannot-compile-alone
page-type-slug: finding
title: "Gate cannot compile alone"
domain-slug: domain/code-editor
---

# Claim

`tools/gate.sh` cannot compile the editor tree on its own: it mounts only the repository, while a compile needs the code repository mounted at both `/code` and its own host path, so a seat running the gate directly gets 108 type errors and is left with an empty `out/` in the working checkout every seat shares.

# Evidence

Found by the seat on project 18950 on 2026-08-13, which needed a served build to measure something and reached for the gate to get one. It left the fault alone deliberately, the gate being a shared tool serving another project's criteria.

`tools/promote.sh` records that the code repository has to go into the container at both `/code` and its own host path, or the compile fails "naming zod rather than naming the mount". The promote passes both and compiles clean, which is why every promote today has worked. `tools/gate.sh` passes neither, so run on its own it produced 108 type errors, every one of them inside `extensions/ops` and none in `src/`.

The error names a package rather than a missing mount, so the failure does not point at its own cause. That is what makes this worth writing down rather than leaving to be rediscovered.

The second half is the sharper one. `npm run compile` clears `out/` before it writes, so a failed compile leaves the checkout with no `out/` at all — and the checkout in question is `/var/home/walton/code-editor`, the working tree every seat shares. A seat that runs the gate to answer a question about its own change destroys the build state of whatever else is standing there. Alan runs `code-editor-live`, which only `promote.sh` writes, so he is not exposed; other seats are.

The repair named by the seat that found it is to copy the mount pair out of `promote.sh` into `gate.sh`. Not done here, and nobody has judged whether that is the right shape or whether the gate should refuse to run where the mounts are absent.
