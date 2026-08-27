---
id: 9431ddc0-a4ee-504f-8c3f-b8ce8c7b61ed
page-type-slug: finding
title: "Ls tree missing z quoting drops nodes"
domain-slug: domain/main-pipeline
---

# Claim

The main-pipeline-creator's git ls-tree parse for the main-deploy graph build omits `-z` and trims per line, so a tracked path with C-quoted (non-ASCII or special) bytes or leading/trailing whitespace silently drops out of repoFiles and its file node, which can cause the inputsHash for a workflow that should include that file to skip it, while the coordinator's sibling implementation already does this correctly.

# Evidence

Project #16269, domain `main-pipeline`, status someday_maybe, tags ci/orchestrator/correctness, owner dalla. No objective written; title carries claim: MPC parses `git ls-tree` without `-z` on main-deploy, C-quoting silently drops file nodes, while the coordinator's sibling does it correctly.

Spun out of #16238's define-front by worker-16225 at dalla's direction, 2026-07-25T19:03Z.

DEFECT: main-pipeline-creator.worker.ts:209,:218-220 builds repoFiles via `git ls-tree -r --name-only <sha>`, newline-split, per-line trim. Two faults: (1) no `-z` — git C-quotes paths with unusual bytes when core.quotePath (default true here), so a non-ASCII/special-byte path arrives quoted, e.g. `"packages/\303\251.ts"`, both a bogus repoFiles element and a silently missing real file node. (2) trim corrupts any path with legal leading/trailing whitespace.

WHY: repoFiles gates file-node creation (discover-repo-files.ts:67-70). A missing file node drops the file from the graph: closure walk can't reach it, inputsHash for a workflow that should include it is computed without it, so a change to it doesn't roll the hash and the skip gate skips a workflow that should run — silent-wrong-answer, on main-deploy.

ASYMMETRY: pipeline-configs-graph-file-set.ts:26 (coordinator path) already does `git ls-tree -r --name-only -z <sha>`, NUL-split, correctly. MPC's private copy diverges. Deletion not repair — MPC should call the existing helper (`listCommitTreePaths`); a test should pin a non-ASCII path surviving into repoFiles.

SEVERITY: latent — fires only on a tracked path with quoted bytes or whitespace. Check: `git ls-files -z|tr "\0" "\n"|LC_ALL=C grep -n "[^ -~]"`; empty today means trap not incident.

PROVENANCE: found answering #16238 (repoFiles injection safety), resolved do-not-inject.

MERGED FROM #16284 (aine, 2026-07-25T20:19Z): defect broader, 4/5 call sites not just MPC. Aine filed independently ~19:57Z, unaware this row existed; closed as duplicate, content carried here.
