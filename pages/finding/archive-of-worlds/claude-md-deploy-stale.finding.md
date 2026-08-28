---
id: 3ca3f845-4f23-51c1-a21b-54fc367da5aa
slug: claude-md-deploy-stale
page-type-slug: finding
title: "Claude MD deploy stale"
domain-slug: domain/archive-of-worlds
---

# Claim

archive-of-worlds/web/CLAUDE.md still frames archive as Child-A-only with deploy wiring pending (Child B #13504) and calls its `deploy/k8s/synth.ts` a "minimal placeholder... never materialized here," even though archive is a live deployed app at archiveofworlds.app.

# Evidence

Filed as project #15879, domain `archive-of-worlds`, status `someday_maybe`. Discovered during #15868 (keyboard adoption); flagged by olwen.

`archive-of-worlds/web/CLAUDE.md` frames archive as Child-A-only with deploy wiring pending (Child B #13504): it calls `deploy/k8s/synth.ts` a "minimal placeholder... never materialized here," says "The deployed URL becomes the source of truth once Child B lands the deploy wiring," and lists deploy/infra as "Out (Child B)."

This is stale: archive is a live deployed app. #15868 deployed to archiveofworlds.app, and the reporting agent live-verified the palette rendering there via Playwright MCP at https://archiveofworlds.app/sign-in. archiveofworlds.app is in the auth-proxy + gotrue origins, and #15421 raised the running service's memory.

Scope recorded for the correction: (1) confirm archive's actual current deploy state/mechanism — is #13504 (Child B) done; how does archive deploy (its own `deploy/k8s/synth.ts` through the project-deploy pipeline); is the synth still a literal placeholder or real now; (2) correct the CLAUDE.md's Scope / Verification / Key-Files sections to reflect archive being deployed (the deployed URL is the source of truth; synth status accurate). Doc-only, no runtime change.

Priority noted: low (Quality: no broken windows — the stale doc misled a lead into a wrong not-deployable inference); described as a quick win once the current mechanism is confirmed.

This row carried no `# Objective` section — it was captured and never defined as a piece of dispatchable work.
