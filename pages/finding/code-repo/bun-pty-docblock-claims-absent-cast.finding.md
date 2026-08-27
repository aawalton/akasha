---
id: e570ed9e-f250-5fb1-968a-775a099b1f93
page-type-slug: finding
title: "Bun pty docblock claims absent cast"
domain-slug: repo/code-repo
---

# Claim

`packages/agents/supervisor/src/bun-pty.ts` opens by telling its reader that a double-cast lives at that boundary, and no double-cast is there. The file's only cast is a single `as`, and the comment forty-nine lines below the claim says so in the file's own words. The same sentence defers to a principle called "Double-Cast Pattern" by bare title, and no document of that name is reachable from either repository, so a reader who doubts the claim has nowhere to check it.

# Evidence

Measured over `~/code` at HEAD `1313565199` on branch `main`, working tree clean, 2026-08-07.

The module docblock, `packages/agents/supervisor/src/bun-pty.ts:5-7`:

    * runtime implements them. Per Double-Cast Pattern the double-cast lives at
    * this single boundary; the shape is runtime-verified.

What the file actually does, at `:53-55`:

    // permitted `as` cast per Type Safety Decisions, narrower than `as unknown as`
    …
    function asBunPtySpawnFn(fn: unknown): BunPtySpawnFn {

`asBunPtySpawnFn` is used once, at `:60`, for `export const spawnPty: BunPtySpawnFn = asBunPtySpawnFn(Bun.spawn)`. `rg 'as unknown as' packages/agents/supervisor/src/bun-pty.ts` returns nothing but the line 53 comment naming the form it is NOT. So the docblock and the code disagree, and the neighbouring comment takes the code's side.

The citation is unreachable rather than merely unpathed. The title stands as bare prose with no path beside it. `rg -i 'double-cast'` over the whole code tree returns only these two lines in this one file. In the instructions repository, `dirty/docs/double-cast-pattern.md` was removed at `af63c286d`, and `dirty/knowledge/` — where a rebuilt heir would have stood — is empty. So neither the title nor any path leads anywhere.

Both halves are load-bearing in the same direction: the docblock exists to tell a later editor that this file is the sanctioned place for an unsound cast and that others should route through it. A reader who believes it will preserve a pattern the file abandoned, and cannot open the principle to find out otherwise.

Found deciding the fourth of six question bullets in `dirty/questions/code-repo-unfindable-citations.md`, which records the same contradiction. That document is queued for its own removal, so the observation is filed here rather than left to go with the sweep.
