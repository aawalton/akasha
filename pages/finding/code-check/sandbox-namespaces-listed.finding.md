---
id: d7ea3c96-f479-546a-8071-5cf2e64983bb
slug: sandbox-namespaces-listed
page-type-slug: finding
title: "Sandbox namespaces listed"
domain-slug: domain/global
---

# Claim

`check-addon-sandbox-safety` derives its banned members from the ESO sandbox manifest but writes the seven partially-available namespace names out in the scanner, so a namespace added to the manifest is scanned by nothing until someone edits the check.

# Evidence

Observed while verifying project #18399 on `project-18484` at commit `1cff3c52bbe5dc227d6fda35f38c16d9425aff29`. The condition predates that commit — `PARTIAL_NAMESPACES` is byte-identical in the parent — so it is the check's standing shape rather than anything #18399 introduced.

In `packages/temper/shared/build-deploy/checks/src/addon-banned-symbols.ts`, `PARTIAL_NAMESPACES` is a written-out list of seven entries: debug, os, coroutine, string, table, math, utf8. Only each entry's available-member set is read from `eso-sandbox.manifest.ts`; the namespace name beside it is a literal in the check. The manifest exports one `ESO_AVAILABLE_<NS>` const per namespace and no list of the namespace names, the sole name list it exports being `ESO_WHOLLY_STRIPPED_NAMESPACES`.

Adding an eighth partially-available namespace to the manifest therefore adds no arm to the scan. Its stripped members are matched by nothing and the gate reports the bundles clean over its full population, which is what makes the gap invisible: the count of bundles scanned does not fall.

The same list makes the scanner's own load-time refusal unreachable. `buildBannedPattern` throws where `arms.length === 0`, on the reasoning that a manifest banning nothing would certify every bundle clean. The partial-namespace arm is built whenever `PARTIAL_NAMESPACES` is non-empty, and it is non-empty from the literal rather than from the manifest, so emptying every manifest list still builds an arm and the throw does not fire.

Measured on the standing manifest, by a probe run against the scanner: all 12 banned constructs are reached, all 70 available members are silent, an undeclared namespace scores no hit and a declared one does. The reach is complete over what is declared today, which is what a derivation would have to keep holding tomorrow.

#18399's Notes say no family list is written out in the scanner and that a manifest supplying no names makes it refuse to load. Both hold for the other two arms and neither holds for this one.
