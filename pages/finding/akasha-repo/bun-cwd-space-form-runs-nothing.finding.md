---
id: 8bb2aa6a-0b02-5b99-b875-7e62684ddecc
slug: bun-cwd-space-form-runs-nothing
page-type-slug: finding
title: "Bun cwd space form runs nothing"
domain-slug: repo/akasha-repo
---

# Claim

Live operator-facing messages in `collections/music-spotify/src/` instruct whoever
reads them to run `bun --cwd <dir> run <script>`, and bun does not parse that form:
it prints its whole `bun run` usage banner, lists the package's scripts, runs
nothing, and exits 0. The directory each of those messages names is itself gone.

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

The sites are runtime messages printed to a human at the moment they are stuck,
not comments:

- `collections/music-spotify/src/oauth.ts:10` — "spotify: no stored token — run the
  consent CLI first (...)"
- `collections/music-spotify/src/harness.ts:65` — "No stored token — run the consent
  CLI first:"
- `collections/music-spotify/src/auth-cli.ts:42` — the `auth:exchange --code <CODE>`
  line
- `collections/music-spotify/src/auth-cli.ts:62` — "no saved PKCE handoff — run step
  1 first:"

A second fault rides inside the same strings. Each spells the directory
`packages/collections/music/spotify`, which no longer stands — the package is at
`collections/music-spotify`. So an operator who worked out the flag form for
himself would still be handed a path that resolves to nothing.

`rg -n -- "bun --cwd "` over the repository returns these and no other executed
command: every occurrence is inside a message string or a document. No test and no
gate runs the form, so nothing reports it.
