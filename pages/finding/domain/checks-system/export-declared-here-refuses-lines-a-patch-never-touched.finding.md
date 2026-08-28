---
page-type-slug: finding
title: "export declared here refuses lines a patch never touched"
domain-slug: domain/checks-system
---

# Claim

`export-declared-here` is declared `needs: file` and `check-on-patch: true`, so it is handed each changed file whole and fails every name that file exports without declaring — including, by its own Design line, a name imported and re-exported unchanged. A patch touching one line of a barrel is therefore refused on every forwarding export the barrel carries, not on the line it touched. This is a live tripwire on work that has nothing to do with exports, not latent debt: three separate pieces of work were stopped by it on 2026-08-27, on `shared/design-system/src/index.ts` and on the `pages-ui` barrels.

# Evidence

Read in the tree on 2026-08-28. `checks-system/check/export-declared-here/export-declared-here.check.md` carries `needs: file` at line 6 and `check-on-patch: true` at line 7, and its Design line reads "A name imported and then exported under the same name is judged the same as one exported straight from its source."

`ops checks audit export-declared-here` on 2026-08-28 reports 843 failures over the tree. The heaviest files are `shared/design-system/src/index.ts` with 144, `shared/design-patterns/src/index.ts` with 50, `infra/cluster-checks/src/producers/index.ts` with 27, `tools/lib/ci-worker-pure/index.ts` with 15 and `tools/lib/daily-tracking/tracking-modules.ts` with 14. Any change set naming one of those files is refused on all of that file's lines at once.

The three blockages on 2026-08-27 are reported from that session and I did not reproduce them; what I confirmed is the mechanism that produces them, and that the two named files still carry enough forwarding exports to produce them again.

Not measured: whether a check handed the changed hunk rather than the whole file could answer the same question at all, given that a re-export is a whole-file fact; how many of the 843 lines stand in files an ordinary change set touches; and whether the count moves under the package work in flight on the design and temper `package.json` exports maps, which touches the same barrels.
