---
id: 24343029-5565-50b7-ba0c-bbec2be5cd9d
slug: hook-registration-unverified-both-sides
page-type-slug: finding
title: "Hook registration unverified both sides"
domain-slug: domain/global
---

# Claim

No instrument in either tree judges a registered hook command against the script on disk, and the justification `hooks-registered` gives for not doing so names a check that has been deleted.

# Evidence

`tools/checks/hooks-registered.ts` counts a `$HOME/code/…` registration and never verifies one, on three stated grounds. The third is that "that tree's own `check-hook-wiring` already walks those paths". That check was deleted from the code repository in commit `e5a4818f57` under #17769, along with `lib/hook-wiring.ts` and its unit suite, and its replacement records the narrowing in its own docblock at `packages/infra/checks/src/lib/enforcement-sources.ts:40-45`: it "parses ONE thing — the commands registered here — where the departed lib also judged them against a documentation table and the scripts on disk".

So the ground held when it was written and does not hold now. What follows is that a registration can name a script that has moved, been renamed or been deleted, and nothing reports it from either side.

Measured 2026-08-04. One artifact of the gap is already standing: `packages/infra/scripts/block-direct-main-writes.sh` is byte-identical to the live `tools/hooks/block-direct-main-writes.sh` as that file stood before the escape hatch came out, is registered by none of the three settings documents, and is executed by no test — `_moved-hook.ts` resolves the suite to the instructions copy. It is a second copy of a guard, invisible to every instrument.

`dirty/knowledge/hook-live-path.md` carries the same dead citation twice: at line 12 in its `code-path:` frontmatter, and at line 43 in the prose naming the justification above.

Not measured: whether the other two grounds `hooks-registered` gives still hold, and whether the right repair is for this tree to verify code-tree registrations or for the code tree to restore a check of its own.
