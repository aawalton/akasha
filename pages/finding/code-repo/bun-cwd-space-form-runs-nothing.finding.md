---
id: 8bb2aa6a-0b02-5b99-b875-7e62684ddecc
page-type-slug: finding
title: "Bun cwd space form runs nothing"
domain-slug: repo/code-repo
---

# Claim

Four live operator-facing messages in `packages/collections/music/spotify/` instruct
whoever reads them to run `bun --cwd <dir> run <script>`, and bun 1.3.14 does not
parse that form: it prints its whole `bun run` usage banner, lists the package's
scripts, runs nothing, and exits 0.

# Evidence

Measured on this host against the bun on PATH, `bun --version` → `1.3.14`, using a
two-file probe under my own seat directory — a `package.json` with one script
`probe` → `bun run ./probe.ts`, and a `probe.ts` printing `process.argv.slice(2)`.
Nothing was run against the live Spotify API.

- `bun --cwd <dir> run probe` → the whole `bun run` usage banner, then
  `package.json scripts (1 found): $ bun run probe`, then exit 0. The script never
  ran; nothing printed `ARGV:`.
- `bun --cwd=<dir> run probe` → `ARGV: []`, exit 0. The equals form works.
- `bun --cwd=<dir> run probe --only a,b` → `ARGV: ["--only","a,b"]`, exit 0.

The exit code is what makes this cost something. A wrong invocation that exits 1 is
noticed; this exits 0 behind a wall of help text, so an operator following the
message sees a large successful-looking response and no error.

Four sites are runtime messages printed to a human at the moment they are stuck,
not comments:

- `.../spotify/src/harness.ts:95` — "No stored token — run the consent CLI first:"
- `.../spotify/src/oauth.ts:32` — "spotify: no stored token — run the consent CLI
  first (...)"
- `.../spotify/src/auth-cli.ts:66` — the `auth:exchange --code <CODE>` line
- `.../spotify/src/auth-cli.ts:87` — "no saved PKCE handoff — run step 1 first:"

`rg -n -- "bun --cwd "` over `~/code` returns nine lines and no others: those four,
three docblocks in the same package (`harness.ts:11`, `auth-cli.ts:12`, `:15`), and
two under `packages/temper/shared/build-deploy/checks/src/` naming
`bun --cwd packages/temper/addons build:addons:only`. None is an executed command,
so no test or gate runs the broken form and nothing reports it.

Not the dangling-citation class `check-repo-paths.ts:16-42` declares out of scope:
that argument is about comments naming deleted documents, "never a path a program
dereferences". These are instructions handed to an operator mid-failure.
