---
id: 73e74c95-c1ef-5c63-96a1-db5b688de446
page-type-slug: finding
title: "Writes hook lacks domain"
domain-slug: domain/alan-harness
---

# Claim

The ungoverned-writes hook does not name an alan-harness document among a path's governors for code behind Alan's harness — only the whole-repository domain claims it, which matches every file and so distinguishes none, and no check confirms a claimed path reaches a file that still exists.

# Evidence

Project #18794, domain alan-harness, parent #18829, initiative harness-without-a-deploy, status someday_maybe, live-on commit. Not yet started.

Objectives: (1) a write to code behind Alan's harness should be refused until the agent holds its harness domain — the ungoverned-writes hook should name an alan-harness document among that path's governors, not only the folder domain over the whole repository; (2) the domain claiming each path should be the one whose concern that code is, so resolving a path from each channel names the harness domain a reader would expect rather than the application or fleet folder alone; (3) every claimed path should reach a file that exists — the schema checks a glob's shape, not its reach, so a claim naming a moved or misspelled path governs nothing and reports nothing while looking correct; (4) no part of the footprint should be governed only by the claim over the whole repository, since that claim matches every file and so distinguishes none, letting it stand over an ungoverned footprint unnoticed; (5) each part of the harness kept in the code repository should have its reason written down — a workstation-only command tool reading the same rows the deployed services read has a reason to stay, and unwritten it reads as an oversight.
