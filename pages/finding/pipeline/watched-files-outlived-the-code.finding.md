---
id: ef83f428-e48e-5bc2-af9a-3c6debfa088d
slug: watched-files-outlived-the-code
page-type-slug: finding
title: "Watched files outlived the code"
domain-slug: page-type/pipeline
---

# Claim

"Watched files" in Design on `domains/pipeline.md` names something the code stopped calling that: `watchPaths` was retired in #11452 and the code now says seed closure and `graphFileSet`. The delivered interface has not moved with it — `ops pipeline redeploy --help` still calls it the workflow's resolved watch-path set — so prose and interface agree with each other and disagree with the code.

# Evidence

Raised by the seat that read `domains/pipeline.md` on 2026-08-13 under `review-instructions`, and relayed here rather than re-derived: it ran the verb's help and read the code, and I did neither.

It reports the Design line itself as true — `inputs-hash.ts` throws `DegradedInputsGraphError` on an empty `graphFileSet` — so what is at issue is the name rather than the claim.

It did not rewrite, because which name wins decides a change in the code repository as much as in this one. `domains/global.md`'s Ubiquitous Naming asks for one name across code, data, interface and prose.

Nothing here measures how many sites carry each of the three names.
